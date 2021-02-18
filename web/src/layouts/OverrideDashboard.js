import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  ButtonGroup,
  ButtonToolbar,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  Table,
  UncontrolledButtonDropdown,
} from "reactstrap";
import Toggle from "react-bootstrap-toggle";
import socketIOClient from "socket.io-client";
import TextTransition, { presets } from "react-text-transition";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import EmulatorSettings from "components/dashboard/EmulatorSettings";
import OverrideControls from "components/dashboard/OverrideControls";
const ENDPOINT = ":3030/"; // By default the VEmulate Webserver runs on port 3030.

const Fade = ({ children, ...props }) => (
  <CSSTransition {...props} timeout={200} classNames="fade" unmountOnExit>
    {children}
  </CSSTransition>
); // A fade transition for elements in the GUI.

const OverrideDashboard = () => {
  const [running, setRunning] = useState("stopped"); // The state of the emulator, used for the buttons. Can be stopped, running or paused.
  const [scenarios, setScenarios] = useState([]); // Contains the list of device configurations that are implemented.
  const [fields, setFields] = useState([]); //Contains the fields that are implemented  for the device.
  const [name, setName] = useState("---"); //The name of the currently selected device configuration
  const [overrides, setOverrides] = useState([]); //The overrides that are used, a list of field keys.
  const [overrideValues, setOverrideValues] = useState({}); //The internal values of the overrides
  const [overrideValuesShared, setOverrideValuesShared] = useState({}); // The override values as shared by the Flask webserver with all connected clients
  const [searchTerm, setSearchTerm] = useState(""); // The search term of the overriding field's search field.
  const [serialmessages, setSerialmessages] = useState([]); // List of the serial messages that have been received or sent by the emulator
  const [settingsOpen, setSettingsOpen] = useState(false); // Whether or not the settings modal is open
  const [settings, setSettings] = useState({}); // Representation of the internal settings of the emulator
  const [socket, setSocket] = useState(undefined); // The socket that is used to communicate with the backend

  // SETTING UP WEBSOCKET TRIGGERS
  useEffect(() => {
    let socket2 = socketIOClient(ENDPOINT); // socket2 will be saved in the state.
    const dec = new TextDecoder("utf-8"); // a text decoder.
    socket2.on("emulator_out", (data) => {
      // Outgoing emulator message
      setSerialmessages((oldMessages) => [
        {
          type: "output",
          datetime: new Date().toLocaleString(),
          content: dec.decode(data.data),
        },
        ...oldMessages,
      ]);
    });
    socket2.on("emulator_in", (data) => {
      // Incoming emulator message
      setSerialmessages((oldMessages) => [
        {
          type: "input",
          datetime: new Date().toLocaleString(),
          content: dec.decode(data.data),
        },
        ...oldMessages,
      ]);
    });
    socket2.on("configs", (data) => {
      // Set the configs which are available to be loaded.
      setScenarios(data.data);
    });
    socket2.on("settings", (data) => {
      // When the VEmulate settings are shared over the websocket.
      setSettings(data);
    });
    socket2.on("hard_reset", () => {
      // Hard reset the page.
      window.location.reload(false);
    });
    socket2.on("emulator_status", (data) => {
      // Set the status of the GUI to reflect the status of VEmulate
      setRunning(data.data);
    });
    socket2.on("current_overrides", (data) => {
      // Set the overrides in the GUI to reflect the values of VEmulate
      setOverrides(data.data);
      setOverrideValuesShared(data.values);
    });
    socket2.on("loaded_config", (data) => {
      // When a device configuration is shared over the websocket
      setName(data.name);
      setFields(data.fields);
    });
    socket2.emit("connected"); // Send a connected message
    setSocket(socket2); // and save the socket to the state, for later re-use.
  }, []);

  // METHODS THAT USE SOCKET
  // 1. Load a specific device configuration
  const loadScenario = (scenario) => {
    socket.emit("load_config", scenario);
  };
  // 2. Run the emulator
  const run = () => {
    socket.emit("run");
  };
  // 3. Pause the emulator
  const pause = () => {
    socket.emit("pause");
  };
  // 4. Stop the emulator
  const stop = () => {
    socket.emit("stop");
  };
  // 5. Open the settings modal. Ask for the current settings used by VEmulate when opening the modal.
  const openSettings = () => {
    socket.emit("get_settings");
    setSettingsOpen(true);
  };
  // 6. Save the settings modal to the server. Hide the modal.
  const saveSettings = (settings) => {
    socket.emit("set_settings", settings);
    setSettingsOpen(false);
  };
  // 7. On the toggle of a field to generated, or to overridden mode.
  const onToggle = (key, e, protocol, bits, signed, default_val) => {
    setOverrides(overrides.filter((item) => item !== key)); // Pre-emptively remove the override, for a smooth transition.
    if (e) {
      // If the field is now using overridden mode:
      socket.emit("override", {
        key: key,
        text: protocol,
        value: createOverride(
          key in overrideValues ? overrideValues[key] : default_val,
          protocol,
          key,
          bits,
          signed
        ),
        stored_val: overrideValues[key],
      });
    } else {
      // If the field is now using generated mode:
      socket.emit("remove_override", { key: key, text: protocol });
    }
  };

  // 8. On a changing input, send a message that the override has changed.
  const onChangInput = (key, event, protocol, bits, signed) => {
    setOverrideValues({ ...overrideValues, [key]: event.target.value });
    if (overrides.includes(key)) {
      socket.emit("override", {
        key: key,
        text: protocol,
        value: createOverride(event.target.value, protocol, key, bits, signed),
        stored_val: event.target.value,
      });
    }
  };

  // OTHERS
  // Create a valid fixed scenario, given a value.
  const createOverride = (value, protocol, key, bits, signed) => {
    let isInt = Number.isInteger(Number(value));

    return [
      {
        type: isInt ? "IntFixed" : "StringFixed",
        protocol: protocol,
        key: key,
        bits: bits,
        signed: signed,
        value: isInt ? Number(value) : value,
      },
    ];
  };

  return (
    <main className="px-md-5">
      <EmulatorSettings
        settingsOpen={settingsOpen}
        closeSettings={() => setSettingsOpen(false)}
        sendConfig={saveSettings}
        persistentConfig={settings}
      ></EmulatorSettings>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h2>
          Emulating:{" "}
          <strong>
            <TextTransition text={name} springConfig={presets.wobbly} />
          </strong>
        </h2>
        <ButtonToolbar className="mb-2 mb-md-0">
          <ButtonGroup className="me-2">
            {running === "running" ? (
              <Button outline color="warning" size="sm" onClick={() => pause()}>
                <i className="fas fa-pause" />
              </Button>
            ) : (
              <Button outline color="success" size="sm" onClick={() => run()}>
                <i className="fas fa-play" />
              </Button>
            )}
            {running === "paused" || running === "running" ? (
              <Button outline color="danger" size="sm" onClick={() => stop()}>
                <i className="fas fa-stop" />
              </Button>
            ) : null}
          </ButtonGroup>
          <Button
            className="me-2"
            outline
            color="info"
            size="sm"
            onClick={() => openSettings()}
          >
            <i className="fas fa-cog"></i>
          </Button>
          <UncontrolledButtonDropdown size="sm" color="secondary">
            <DropdownToggle caret>
              <i className="fas fa-sliders-h" />
              &nbsp; Load Device Configuration
            </DropdownToggle>
            <DropdownMenu right>
              {scenarios.map((item, index) => {
                return (
                  <DropdownItem
                    onClick={() => loadScenario(item)}
                    key={item + index}
                  >
                    {item}
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </UncontrolledButtonDropdown>
        </ButtonToolbar>
      </div>
      <Row>
        <Col md="8">
          {" "}
          <input
            onChange={(event) =>
              setSearchTerm(event.target.value.toUpperCase())
            }
            type="text"
            className="form-control"
            placeholder={"Search"}
            value={searchTerm}
          />
          <Table responsive className="table-theme table-row v-middle">
            <thead>
              <tr>
                <th className="text-muted" style={{ width: "60px" }}>
                  Name / Key
                </th>
                <th className="text-muted" style={{ width: "60%" }} />
                <td style={{ width: "5px" }} />
                <td />
                <th className="text-muted" style={{ width: "50px" }}>
                  Override Value
                </th>
                <th className="text-muted" style={{ width: "110px" }}>
                  Overridde status
                </th>
                <th className="text-muted" style={{ width: "30px" }}>
                  Text protocol
                </th>
              </tr>
            </thead>
            <TransitionGroup className="controls-list" component="tbody">
              {fields.map((item) => {
                return (
                  <Fade key={name + "-" + item.key}>
                    <tr
                      className={
                        (item.key + " " + item.name)
                          .toUpperCase()
                          .indexOf(searchTerm) > -1
                          ? "v-middle"
                          : "hidden v-middle"
                      }
                    >
                      <td>
                        <Badge color="primary" className="text-uppercase">
                          {item.name}
                        </Badge>
                        <Badge
                          color="secondary"
                          className="text-uppercase"
                          style={{ display: "block" }}
                        >
                          {item.key}
                        </Badge>
                      </td>
                      <OverrideControls
                        item={item}
                        overridden={item.key in overrideValues}
                        overrideValue={overrideValues[item.key]}
                        onChangInput={onChangInput}
                      />
                      <td />
                      <td className="flex">
                        <span className="badge bg-primary-lt">
                          {overrideValuesShared[item.key]}
                        </span>
                      </td>
                      <td>
                        <Toggle
                          onClick={(event) =>
                            onToggle(
                              item.key,
                              event,
                              item.text,
                              item.bits,
                              item.signed,
                              item.default
                            )
                          }
                          on="Overridden"
                          off="Generated"
                          size="xs"
                          active={overrides.includes(item.key)}
                        />
                      </td>
                      <td>
                        {item.text && item.text === true ? (
                          <span className="badge badge-circle xs text-primary" />
                        ) : null}
                      </td>
                    </tr>
                  </Fade>
                );
              })}
            </TransitionGroup>
          </Table>
        </Col>
        <Col md="4">
          <Table
            responsive
            className="table table-theme table-row v-middle restrict-height"
          >
            <thead>
              <tr>
                <td style={{ width: "16.66%" }} />
                <td style={{ width: "60%" }} />
                <td style={{ width: "23.33%" }}>
                  <Button
                    outline
                    color="secondary"
                    size="sm"
                    onClick={() => setSerialmessages([])}
                  >
                    <i className="fas fa-trash" />
                  </Button>
                </td>
              </tr>
            </thead>
            <tbody id="log">
              {serialmessages.map((message) => {
                return (
                  <tr className="v-middle slide">
                    <td>
                      <span data-abc="true">
                        {message.type === "output" ? (
                          <span className="badge bg-success-lt text-uppercase">
                            Output
                          </span>
                        ) : (
                          <span className="badge bg-info-lt text-uppercase">
                            Input
                          </span>
                        )}
                      </span>
                    </td>
                    <td className="flex">
                      <pre className="mb-0 align-left">{message.content}</pre>
                    </td>
                    <td>{message.datetime}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </main>
  );
};

export default OverrideDashboard;
