import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

const EmulatorSettings = (props) => {
  const [internalConfig, setIC] = useState(props.persistentConfig); // A representation of the VEmulator's internal config, but client-side
  useEffect(() => {
    setIC(props.persistentConfig); // If the props update the config, i.e. a new one has been received via the websocket, update.
  }, [props.persistentConfig]);
  return (
    <Modal isOpen={props.settingsOpen} toggle={props.closeSettings}>
      <ModalHeader toggle={props.closeSettings}>
        VEmulate Persistent Settings
      </ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="inputType">Input Type</Label>
          <Input
            type="select"
            name="select"
            id="inputType"
            onChange={(e) =>
              setIC({ ...internalConfig, input_type: e.target.value })
            }
            value={internalConfig["input_type"]}
          >
            <option value="file">File</option>
            <option value="serial">Serial</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="inputPath">
            Input Location (e.g. COM01, or /dev/usb1)
          </Label>
          <Input
            type="text"
            id="inputPath"
            onChange={(e) =>
              setIC({ ...internalConfig, input_path: e.target.value })
            }
            value={internalConfig["input_path"]}
          />
        </FormGroup>
        <FormGroup>
          <Label for="outputType">Output Type</Label>
          <Input
            type="select"
            name="select"
            id="outputType"
            onChange={(e) =>
              setIC({ ...internalConfig, output_type: e.target.value })
            }
            value={internalConfig["output_type"]}
          >
            <option value="standard">Standard</option>
            <option value="file">File</option>
            <option value="serial">Serial</option>
          </Input>
        </FormGroup>
        {internalConfig["output_type"] === "standard" ? null : (
          <FormGroup>
            <Label for="outputPath">
              Output Location (e.g. COM01, or /dev/usb1)
            </Label>
            <Input
              type="text"
              id="outputPath"
              onChange={(e) =>
                setIC({ ...internalConfig, output_path: e.target.value })
              }
              value={internalConfig["output_path"]}
            />
          </FormGroup>
        )}
        <FormGroup>
          <Label for="ber">Bit error rate (between 0.0 and 1.0)</Label>
          <Input
            id="ber"
            min={0}
            max={1}
            type="number"
            onChange={(e) => {
              let result = Number(e.target.value);
              setIC({
                ...internalConfig,
                bit_error_rate:
                  result > 1.0 ? 1.0 : result < 0.0 ? 0.0 : result,
              });
            }}
            value={internalConfig["bit_error_rate"]}
          />
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input
              type="checkbox"
              onChange={(e) =>
                setIC({
                  ...internalConfig,
                  bit_error_checksum: e.target.checked,
                })
              }
              checked={internalConfig["bit_error_checksum"]}
            />{" "}
            Allow bit errors in checksum
          </Label>
        </FormGroup>
        <FormGroup>
          <Label for="delay">Delay in seconds between text messages</Label>
          <Input
            id="delay"
            min={0}
            max={1000}
            type="number"
            onChange={(e) => {
              let result = Number(e.target.value);
              setIC({ ...internalConfig, delay: result < 0.0 ? 0.0 : result });
            }}
            value={internalConfig["delay"]}
          />
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input
              type="checkbox"
              onChange={(e) =>
                setIC({ ...internalConfig, timed: e.target.checked })
              }
              checked={internalConfig["timed"]}
            />{" "}
            Configuration uses timed/interval fields.
          </Label>
        </FormGroup>
        <FormGroup>
          <Label for="stopCondition">Stopping condition</Label>
          <Input
            type="select"
            name="select"
            id="stopCondition"
            onChange={(e) =>
              setIC({ ...internalConfig, stop_condition: e.target.value })
            }
            value={internalConfig["stop_condition"]}
          >
            <option value="none">None</option>
            <option value="text">When text scenarios are done</option>
            <option value="hex">When hex scenarios are done</option>
            <option value="text-hex">
              When hex and text scenarios are done
            </option>
          </Input>
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          onClick={(e) => props.sendConfig(internalConfig)}
        >
          Save
        </Button>{" "}
        <Button color="secondary" onClick={props.closeSettings}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};
export default EmulatorSettings;
