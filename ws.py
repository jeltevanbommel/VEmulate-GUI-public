import glob
import logging
import os
import time
from functools import wraps
from random import Random

import eventlet
import yaml
from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO, emit
from vemulator.configuration.config import EmulatorConfig
from vemulator.emulator.emulator import Emulator
from vemulator.input.fileinput import FileInput
from vemulator.input.serialinput import SerialInput
from vemulator.output.fileoutput import FileOutput
from vemulator.output.serialoutput import SerialOutput
from vemulator.output.standardoutput import StandardOutput
from vemulator.util import log
from vemulator.util.deserialize_scenario import deserialize_scenario

log.set_stdout_logging(True)


class VEmulateBridge:
    """" Variables and constants:"""

    app = None
    socketio = None
    emulator = None
    config = None
    override_values = {}
    gui_view = []
    current_config_name = None
    logger = log.init_logger(__name__)
    config_persistent_settings = {'input_type': 'file', 'input_path': 'input.txt', 'output_type': 'standard',
                                  'output_path': '', 'bit_error_rate': 0.0, 'bit_error_checksum': False, 'delay': 5.0,
                                  'timed': False, 'stop_condition': 'none'}

    """Flask and Socket.IO specifics:"""

    def __init__(self):
        """Initializes the VEmulate bridge by initializing the Flask configuration. To start the server,
        see VEmulateBridge.start() """
        self.app = Flask(__name__, static_url_path='', static_folder='web/build')
        # Rewrite the / to index.html, such that we do not have to visit http://localhost:3030/index.html
        self.app.add_url_rule('/', 'index', self.index)
        # Configure CORS to allow every origin
        CORS(self.app)
        self.socketio = SocketIO(self.app, async_mode='eventlet', cors_allowed_origins='*')
        # Add Socket IO event listeners for the websockets
        self.socketio.on_event('load_config', self.load_config)
        self.socketio.on_event('list_configs', self.list_configs)
        self.socketio.on_event('connected', self.connected)
        self.socketio.on_event('config', self.current_config)
        self.socketio.on_event('override', self.override)
        self.socketio.on_event('remove_override', self.remove_override)
        self.socketio.on_event('overrides', self.current_overrides)
        self.socketio.on_event('run', self.run)
        self.socketio.on_event('stop', self.stop)
        self.socketio.on_event('pause', self.pause)
        self.socketio.on_event('get_presets', self.get_presets)
        self.socketio.on_event('set_settings', self.set_settings)
        self.socketio.on_event('get_settings', self.current_settings)

    def start(self):
        """Starts the socket io server and refresh all clients"""
        self.socketio.run(self.app, port=3030)
        # Give command to front-end to refresh, since there has been a complete reload
        self.socketio.emit('hard_reset', broadcast=True)

    def index(self):
        """ Returns the static index.html page"""
        return self.app.send_static_file('index.html')

    """Websocket event handlers:"""

    def connected(self):
        """When a new connection has just connected to the websocket, all current, relevant, data is shared through
        this method.
        """
        self.list_configs()
        self.current_overrides()
        self.current_config()
        self.current_status()

    def set_settings(self, values):
        """Set the persistent settings for the VEmulate core. This includes things as the delay between text
        messages.
        :param values: A dictionary with the keys: 'input_type', 'input_path', 'output_type', 'output_path',
        which are used to denote the input and output of the emulator. These are similar to the CLI parameters of
        VEmulate, as in that the input type only accepts 'file' and 'serial', whereas the output type can be 'file',
        'serial' and 'standard'. Additional keys are needed for the bit_error_rate, which is a float, and the flag
        that indicates whether or not bit errors in the checksum can occur 'bit_error_checksum'.  As well as the
        delay between text messages, which is set with a float in the key 'delay', the stop_condition of the emulator
        which is set using the key 'stop_condition' and the values 'none, 'text', 'hex' or 'text-hex' (see
        VEmulateCore.Config.set_stop_condition, and the key 'timed' which can be set to True if using timed generation.
        :type values: dict
        """
        # Input validation on the received settings.
        input_valid = "input_type" in values and 'input_path' in values and values['input_type'] in ['file',
                                                                                                     'serial'] and len(
            values['input_path']) > 1
        output_valid = "output_type" in values and 'output_path' in values and values['output_type'] in ['file',
                                                                                                         'serial',
                                                                                                         'standard'] and (
                               len(values['input_path']) > 1 or values['output_type'] == 'standard')
        bit_error_valid = "bit_error_rate" in values and 'bit_error_checksum' in values and (
                type(values['bit_error_rate']) == float or type(values['bit_error_rate']) == int) and type(
            values['bit_error_checksum']) == bool and 1.0 >= \
                          values['bit_error_rate'] >= 0.0
        delay_timed_valid = "delay" in values and 'timed' in values and (
                type(values['delay']) == float or type(values['delay']) == int) and type(values['timed']) == bool
        stop_condition_valid = "stop_condition" in values and values['stop_condition'] in ['none', 'text', 'hex',
                                                                                           'text-hex']
        # Only proceed if the received settings are valid
        if input_valid and output_valid and bit_error_valid and delay_timed_valid and stop_condition_valid:
            self.config_persistent_settings = values
        # Set the configuration
        if self.config is not None:
            self.reload_persistent_settings(self.config)
        # And broadcast the current settings.
        self.current_settings()

    def current_settings(self):
        """Broadcasts the current persistent settings for the emulator. See set_settings for the structure of the
        response."""
        emit('settings', self.config_persistent_settings)

    def reload_persistent_settings(self, config):
        """Apply the persistent settings to a configuration instance
         :param config: Configuration to apply the persistent settings to.
         :type config: Configuration"""
        # Set the input of the emulator
        if self.config_persistent_settings['input_type'] == 'serial':
            result = SerialInput(self.config_persistent_settings['input_path'])
        elif self.config_persistent_settings['input_type'] == 'file':
            result = FileInput(self.config_persistent_settings['input_path'])
        else:
            self.logger.error("Invalid input_type was encountered in the persistent settings: {}".format(
                self.config_persistent_settings['input_type']))
            return
        result.readline = self.decorate_input(result.readline)  # monkey-patch with decorated input.
        config.set_input(result)
        # Set the output of the emulator
        if self.config_persistent_settings['output_type'] == 'serial':
            result = SerialOutput(self.config_persistent_settings['output_path'])
        elif self.config_persistent_settings['output_type'] == 'file':
            result = FileOutput(self.config_persistent_settings['output_path'])
        elif self.config_persistent_settings['output_type'] == 'standard':
            result = StandardOutput()
        else:
            self.logger.error("Invalid output_type was encountered in the persistent settings: {}".format(
                self.config_persistent_settings['input_type']))
            return
        result.write = self.decorate_output(result.write)  # monkey-patch with decorated output
        config.set_output(result)
        # Set other persistent settings of the emulator
        config.set_delay(self.config_persistent_settings['delay'])  # Set delay
        config.set_bit_error_rate(self.config_persistent_settings['bit_error_rate'])  # Set bit error rate
        config.set_bit_error_checksum(
            self.config_persistent_settings['bit_error_checksum'])  # Set bit errors in checksum
        config.set_timed(self.config_persistent_settings['timed'])  # Set whether timed generation is enabled
        config.set_stop_condition(self.config_persistent_settings['stop_condition'])  # Set the stop condition

    def list_configs(self):
        """"List the names of the YAML device configs that are available in the configs directory """
        emit('configs', {'data': glob.glob('emulator\\configs\\*.yaml')})

    def load_config(self, configname):
        """"Load a YAML device configuration with the specified filename. Stops and reloads the emulator if the emulator
        is running.
        :param configname: the path to the configuration file.
        :type configname: String"""
        if self.emulator is not None and self.emulator.stop:
            self.emulator.stop()
        self.current_config_name = configname
        self.initialize_emu_conf()

    def current_config(self):
        """Broadcasts the currently selected device configuration (including the fields of the configuration) to the
        websockets."""
        self.logger.debug('on_config')
        if self.config is not None and self.config.get_name:
            emit('loaded_config', {'name': self.config.get_name(), 'fields': self.gui_view},
                 broadcast=True)
        else:
            emit('loaded_config', {'name': '---', 'fields': []}, broadcast=True)

    def require_emulator_not_none(self):
        """Function that can be used to raise an exception if the emulator is none."""
        if self.emulator is None:
            raise Exception('Emulator is None')

    def override(self, kv):
        """Override a specific key with a scenario.
        :param kv: Dictionary containing the following keys: 'key' for
        the key of the field that will be overwritten, 'value' for the scenario that will be used to overwrite the
        field, 'text' to indicate whether the field is a text field, 'stored_val' the value that will be shown in the
        user interface (of others) as the overridden value.
        :type kv: dict """
        self.logger.debug(f'on_override: {kv}')
        self.require_emulator_not_none()
        if 'value' not in kv or 'key' not in kv:
            return
        scenario = deserialize_scenario(kv['value'], {}, Random())
        self.override_values[kv['key']] = kv.get('stored_val', '')
        if kv.get('text', True):
            self.emulator.overwrite_text_scenarios(kv['key'], scenario)  # Override text protocol
        else:
            self.emulator.overwrite_hex_scenarios(kv['key'], scenario)  # Override hex protocol

        self.current_overrides()  # Broadcast the current overrides.

    def remove_override(self, kv):
        """Removes the override for a specific key.
        :param kv: Dictionary containing the following keys: 'key' for the key of the field that will be overwritten,
        'text' that indicates whether the field is part of the hex or text protocol.
        :type kv: dict"""
        self.logger.debug('on_remove_override')
        self.require_emulator_not_none()
        if 'key' not in kv:
            return
        self.override_values.pop(kv['key'])
        if not kv.get('text', False):
            if kv['key'] in self.emulator.overwritten_hex_scenarios:
                self.emulator.overwritten_hex_scenarios.pop(kv['key'])
        else:
            if kv['key'] in self.emulator.overwritten_text_scenarios:
                self.emulator.overwritten_text_scenarios.pop(kv['key'])
        self.current_overrides()

    def get_presets(self):
        """Sends the presets that are available for the emulator. Unnecessary information, such as the actual
        emulation scenario of the field is not sent, but rather the name of the preset, the key and the description
        from the YAML. """
        protocols_dir = 'emulator/protocols'
        presets = [preset for preset in os.listdir(protocols_dir) if os.path.isdir(os.path.join(protocols_dir, preset))]
        result = {}
        for preset in presets:
            fields = []
            for file in os.listdir(os.path.join(protocols_dir, preset)):
                with open(os.path.join(protocols_dir, preset, file)) as file_reader:
                    data = yaml.safe_load(file_reader)
                fields.append({
                    'key': data['key'] if 'key' in data else None,
                    'description': data['detailed_description'] if 'detailed_description' in data else None
                })
            result[preset] = fields
        self.socketio.emit('presets', {'data': result})

    def current_overrides(self):
        """Broadcasts the current overridden keys and the values, such that they can be visualized on all connected
        clients."""
        self.logger.debug('on_overrides')
        if self.emulator is None:
            return
        emit('current_overrides', {'data': list(self.override_values.keys()), 'values': self.override_values},
             broadcast=True)

    def run(self):
        """Runs the emulator. """
        self.logger.debug('on_run')
        self.require_emulator_not_none()
        if self.emulator.get_status() == 'initialized':
            eventlet.spawn(self.emulator.run)
        elif self.emulator.get_status() == 'paused':
            self.emulator.resume()
        self.socketio.emit('emulator_status', {'data': 'running'}, broadcast=True)

    def pause(self):
        """Pauses the emulator."""
        self.require_emulator_not_none()
        self.emulator.pause()
        self.socketio.emit('emulator_status', {'data': 'paused'}, broadcast=True)

    def stop(self):
        """Stops the emulator and reinitializes the configuration"""
        self.require_emulator_not_none()
        self.emulator.stop()
        self.initialize_emu_conf()
        self.socketio.emit('emulator_status', {'data': 'stopped'}, broadcast=True)

    def current_status(self):
        """Broadcasts the current status of the emulator, e.g. whether the emulator is running, stopped or paused"""
        if self.emulator is None:
            return
        status_mapping = {'running': 'running', 'stopping': 'stopped', 'pausing': 'paused', 'paused': 'paused',
                          'resuming': 'running', 'initialized': 'stopped'}
        self.socketio.emit('emulator_status', {'data': status_mapping[self.emulator.get_status()]}, broadcast=True)

    def initialize_emu_conf(self):
        """ Initializes a new configuration for a new emulator object. The config and emulator are completely
        re-initialized, but properties that are defined in the persistent settings are reapplied """
        # Close the old config's in and output.
        if self.config is not None and hasattr(self.config, 'input') and hasattr(self.config.input, 'file'):
            self.config.input.file.close()
        elif self.config is not None and hasattr(self.config, 'input') and hasattr(self.config.input, 'serial'):
            self.config.input.serial.close()
        # Create a new config
        new_config = EmulatorConfig()
        self.decorate_config(new_config)  # decorate the new config, such that yaml scenarios loaded are processed by
        # our custom interpreter, which filters the GUI properties.
        self.override_values = {}  # Remove any overrides that were previously set (for an older config)
        new_config.set_config_file(self.current_config_name)
        new_config.generator_dict = dict()  # Ensure the generators are empty
        new_config.hex_generator_dict = dict()
        self.reload_persistent_settings(new_config)  # Apply the persistent settings
        new_config.create_scenarios()  # Deserialize the scenario structure into scenario instances.
        new_emulator = Emulator(new_config)  # Start an emulator with the new config.
        self.config = new_config  # Replace the old config with the new config
        self.emulator = new_emulator  # Replace the old emulator with the new emulator
        logging.shutdown()  # Clear all old open log handles.
        # Announce the current, relevant data through broadcasts:
        self.current_overrides()
        self.current_config()
        self.current_status()

    """ Decorators, which hook into the VEmulate core:"""

    def decorate_output(self, func):
        """"Adds a broadcast socket emitter to the output interface, such that when data is written to the output
        interface, it is written to the websocket as well.
        :param func: The write function of the output interface
        :type func: function
        :returns func: decorated function"""
        @wraps(func)
        def write_and_write_to_gui(data):
            self.socketio.emit('emulator_out', {'data': data}, broadcast=True)
            return func(data)

        return write_and_write_to_gui

    def decorate_input(self, func):
        """"Adds a broadcast socket emitter to the input interface, such that when data is read from the input
        interface, it is written to the websocket as well.
        :param func: The write function of the input interface
        :type func: function
        :returns func: decorated function"""
        @wraps(func)
        def readline_and_readline_to_gui():
            input_result = func()
            self.socketio.emit('emulator_in', {'data': input_result}, broadcast=True)
            return input_result

        return readline_and_readline_to_gui

    def decorate_config(self, new_config):
        """"Hooks into the configuration loading the scenarios, to create a custom list of fields for the GUI,
        which leaves out unnecessary details, such as the entire emulation scenario."""
        def create_gui_view(emulated_parameter, generator_dict, protocol, seed):
            controls = [{'type': 'stringInput'}, {'type': 'intInput'}]
            controls.extend(emulated_parameter.get('custom_gui_elements', []))
            gui_representation = {'name': emulated_parameter.get('name', 'empty'),
                                  'key': emulated_parameter.get('key', 'key'),
                                  'default': emulated_parameter.get('default', None),
                                  'controls': controls,
                                  'text': protocol == 'text',
                                  'signed': emulated_parameter.get('custom_gui_props', {}).get('signed',
                                                                                               protocol == 'text'),
                                  'bits': emulated_parameter.get('custom_gui_props', {}).get('bits', None)}
            self.gui_view.append(gui_representation)

        self.gui_view = []
        new_config.on_create_field_scenarios = create_gui_view

def gui():
    time.sleep = eventlet.sleep  # Monkeypatch the thread sleeping, to allow eventlet threads to continue working.

    bridge = VEmulateBridge()
    bridge.start()


if __name__ == '__main__':
   gui()