import React, { useEffect, useState } from "react";
import TextTransition, { presets } from "react-text-transition";
import Nestable from "react-nestable";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import socketIOClient from "socket.io-client";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

const templates = {
  Loop: { type: "Loop", amount: "", seed: "", values: [] },
  IntFixed: { type: "IntFixed", amount: "", value: "" },
  StringFixed: { type: "StringFixed", amount: "", value: "" },
  RandomInt: { type: "RandomInt", amount: "", seed: "", min: "", max: "" },
}; // The scenarios and their attributes that are currently implemented in the configuration builder.

const ConfigBuilder = () => {
  const [tree, setTree] = useState([]); // The tree of the 'test' field, in which the items of the field editor (the drag and drop scenario editor) are placed
  const [preset, setPresets] = useState({}); // A dictionary with as key the name of the preset and as value a list of keys of fields within the preset
  const [selectedPreset, setSelectedPreset] = useState(""); // The currently selected preset name
  const [selectedPreset2, setSelectedPreset2] = useState({
    // The currently selected preset field
    key: "",
    description: "",
  });
  const [config, setConfig] = useState({ preset: "", preset_fields: {} }); // Built-in representation of the config, this excludes the tree variable
  const [modal, setModal] = useState(false); // Whether the modal of the generated config should be shown
  const [yaml, setYaml] = useState(""); // The yaml of the genereated config
  const toggle = () => setModal(!modal); // Toggle the modal of the generated config.
  // Setting up the websocket:
  useEffect(() => {
    let socket2 = socketIOClient(":3030/");
    socket2.on("presets", (data) => {
      setPresets(data.data);
    });
    // Ask the websocket for the presets that are implemented
    socket2.emit("get_presets");
  }, []);

  /**
   * The final configuration can contain fields such as the id, integers that are converted into strings
   * and undefined variables. These can be removed or altered to create the final configuration
   * @param {object} obj the object to cleanse
   */
  const cleanse = (obj) => {
    Object.keys(obj).forEach(function (key) {
      var value = obj[key];
      var type = typeof value;
      if (key === "id") {
        // Remove the id
        delete obj[key];
      }
      if (Number.isInteger(Number(value))) {
        obj[key] = Number(value); // Cast to an integer if it is an integer
      }
      if (type === "object") {
        // Recursively travel through the configuration
        cleanse(value);
        if (!Object.keys(value).length) {
          delete obj[key];
        }
      } else if (type === "undefined") {
        // Remove an undefined key
        delete obj[key];
      }
    });
  };

  /**
   * Preview the generated YAML configuration
   */
  const preview = () => {
    let config_copy = Object.assign({}, config);
    config_copy["fields"] = {
      name: "Test",
      key: "T",
      units: "T",
      values: tree,
    }; // Create a copy of the config, before using the cleanse operation.
    // A copy is necessary since we cannot directly alter the state.
    cleanse(config_copy);
    const yaml = require("js-yaml"); // use js-yaml to create the yaml representation
    setYaml(yaml.dump(config_copy));
    toggle();
  };
  /***
   * The representation of a field is nested, as such finding the ancestors  of a nested object is not easily done.
   * By recursing through the nested scenarios, the child with a similar id to the nested object is found. As the id
   * is unique, the found object will be identical. The path through the nested objects, i.e. the indices that were used
   * in the values field, to arrive at the nested object, is returned as a result of this function.
   * @param {*} object   The object parameter is the root of the nested scenarios
   * @param {*} key      The id of the nested object to which a path has to be found
   * @param {*} route    the current route.
   */
  const findVal = (object, key, route) => {
    let value;
    Object.keys(object).some(function (k) {
      if (k === "id" && object[k] === key) {
        value = route;
        return true;
      }
      if (object[k] && typeof object[k] === "object") {
        let route2 = route.slice();
        if (k !== "values") {
          route2.push(k);
        }
        value = findVal(object[k], key, route2);
        return value !== undefined;
      }
      return false;
    });
    return value;
  };

  /** Update a nested object's attribute. To reflect this update in the state, the entire tree has to be updated.
   * To do this, the ancestors of the nested object has to be known, which is found using route as retrieved via the findVal function.
   * @param {*} id the id of the nested object whose attribute has to be changed
   * @param {*} attr the attrribute name that has to be changed
   * @param {*} newvalue the new value of the attribute
   */
  const update = (id, attr, newvalue) => {
    let route = findVal(tree, id, []);
    let config = tree.slice();
    let val = tree;
    for (let i = 0; i < route.length - 1; i++) {
      val = val[route[i]].values;
    }
    val[route[route.length - 1]][attr] = newvalue;
    setTree(config);
  };

  /**
   * Add an item to the scenario tree. The key parameter indicates which template type is used for the item.
   * The item will have a randomly generated ID, to make it identifiable for the findVal function.
   * @param {string} key Key of a template in the templates constant.
   */
  const addItem = (key) => {
    let templateClone = Object.assign({}, templates[key]);
    templateClone["id"] = "_" + Math.random().toString(36).substr(2, 9);
    setTree([...tree, templateClone]);
  };

  /**
   * Add an item to the list of presets
   * @param {string} key the key of the preset that will be added.
   */
  const addPreset = (key) => {
    setConfig({
      ...config,
      preset: selectedPreset,
      preset_fields: { ...config.preset_fields, [key]: "default" },
    });
  };

  /**
   * Render an item for the drag and drop view.
   * @param {*} item a node in the tree that has to be rendered
   * @returns React object of the rendered card.
   */
  const renderItem = ({ item }) => {
    return (
      <Card>
        <CardHeader>{item.type}</CardHeader>
        <CardBody>
          {Object.keys(item).map((key) => {
            if (key === "values" || key === "id" || key === "type") {
              return <></>;
            }
            return (
              <FormGroup>
                <Label for="examplePassword">{key}</Label>
                <Input
                  type="text"
                  value={item[key]}
                  onChange={(event) => {
                    update(item.id, key, event.target.value);
                  }}
                />
              </FormGroup>
            );
          })}
        </CardBody>
      </Card>
    );
  };
  return (
    <main className="px-md-5">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h2>
          Creating Config:{" "}
          <Button onClick={(event) => preview()}>Generate config</Button>
          <strong>
            <TextTransition
              text={
                "name" in config && config.name !== undefined
                  ? config.name
                  : "---"
              }
              springConfig={presets.wobbly}
            />
          </strong>
        </h2>
      </div>
      <Row>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Generated Config</ModalHeader>
          <ModalBody>
            <SyntaxHighlighter language="yaml" style={docco}>
              {yaml}
            </SyntaxHighlighter>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={(e) => navigator.clipboard.writeText(yaml)}
            >
              Copy
            </Button>{" "}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <div className="col md-4 justify-content-center">
          <div className="card" style={{ width: "100%" }}>
            <h5 className="card-header">Base Information</h5>
            <div className="card-body">
              <h5 className="card-title ">Test Name</h5>
              <p className="card-text">
                The name that is used to describe this specific test. This will
                only be used for visual purposes and is not used in the
                protocol.
              </p>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="MPPT Fuzzing"
                  onChange={(event) =>
                    setConfig({ ...config, name: event.target.value })
                  }
                />
              </div>
              <h5 className="card-title mt-3">Device Name</h5>
              <p className="card-text">
                The name that is used to describe the device. This will only be
                used for visual purposes and is not used in the protocol.
              </p>
              <div className="form-group">
                <input
                  type="name"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="MPPT BlueSolar"
                  onChange={(event) =>
                    setConfig({ ...config, device: event.target.value })
                  }
                />
              </div>

              <h5 className="card-title mt-3">Hex Version</h5>
              <p className="card-text">
                Firmware version, optional if not using hex protocol.
              </p>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="0x00"
                  onChange={(event) =>
                    setConfig({ ...config, version: event.target.value })
                  }
                />
              </div>
              <h5 className="card-title mt-3">Product ID</h5>
              <p className="card-text">
                Product ID, optional if not using hex protocol
              </p>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="0x00"
                  onChange={(event) =>
                    setConfig({ ...config, product_id: event.target.value })
                  }
                />
              </div>
              <h5 className="card-title mt-3">Bootloader</h5>
              <p className="card-text">
                Payload required to enter boot mode, false by default to disable
                'boot' command
              </p>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="false"
                  onChange={(event) =>
                    setConfig({ ...config, bootloader: event.target.value })
                  }
                />
              </div>
              <h5 className="card-title mt-3">Emulation type</h5>
              <p className="card-text">
                Does the device emulation involve text emulation, hex emulation,
                or both.
              </p>
              <select
                className="form-control emphasized_selector"
                onChange={(event) =>
                  setConfig({ ...config, protocol: event.target.value })
                }
              >
                <option value="text">Text</option>
                <option value="hex">Hex</option>
                <option value="text_hex">Text + Hex</option>
              </select>
            </div>
          </div>
        </div>
        <Col md={4}>
          <div className="card">
            <h5 className="card-header">Preset Protocol fields</h5>
            <div className="card-body">
              <h5 className="card-title">Load Preset</h5>
              <p className="card-text">
                If the device is fully adhering the VE.Direct protocol, the
                fields can be selected from a preset, to ease configuration.
                Select the correct preset for the device below.
              </p>
              <select
                className="form-control"
                disabled={
                  "preset_fields" in config &&
                  config.preset_fields != null &&
                  Object.keys(config.preset_fields).length > 0
                }
                onChange={(event) => {
                  setSelectedPreset(event.target.value);
                  setSelectedPreset2(
                    preset[event.target.value].length > 0
                      ? preset[event.target.value][0]
                      : { key: "", description: "" }
                  );
                  setConfig({
                    ...config,
                    preset_fields: undefined,
                    preset: undefined,
                  });
                }}
              >
                {Object.keys(preset).map((name) => {
                  return <option>{name}</option>;
                })}
              </select>
              {selectedPreset !== "" ? (
                <select
                  className="form-control"
                  onChange={(event) => {
                    setSelectedPreset2(
                      preset[selectedPreset][event.target.value]
                    );
                  }}
                >
                  {preset[selectedPreset].map((name, index) => {
                    return <option value={index}>{name.key}</option>;
                  })}
                </select>
              ) : null}
              {selectedPreset2.description}
              <br></br>
              {selectedPreset2.key !== "" ? (
                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => addPreset(selectedPreset2.key)}
                >
                  Add {selectedPreset2.key}
                </button>
              ) : null}
            </div>
          </div>
          {"preset_fields" in config && typeof config.preset_fields === "object"
            ? Object.keys(config.preset_fields).map((item, index) => {
                return (
                  <div className="card text-white bg-dark mb-3 mt-3">
                    <div className="card-header">
                      {item}
                      <button
                        type="button"
                        className={"btn btn-sm btn-outline-light"}
                        style={{ right: "20px", position: "absolute" }}
                        onClick={() => {
                          const configCopy = Object.assign({}, config);
                          delete configCopy.preset_fields[item];
                          setConfig(configCopy);
                        }}
                      >
                        X
                      </button>
                    </div>
                    <div className="card-body">
                      <button
                        type="button"
                        className={
                          config.preset_fields[item] === "random"
                            ? "btn btn-sm btn-primary mr-1"
                            : "btn btn-sm btn-outline-light mr-1"
                        }
                        onClick={() =>
                          setConfig({
                            ...config,
                            preset_fields: {
                              ...config.preset_fields,
                              [item]: "random",
                            },
                          })
                        }
                      >
                        Random
                      </button>

                      <button
                        type="button"
                        className={
                          config.preset_fields[item] === "fuzzing"
                            ? "btn btn-sm btn-primary mr-1"
                            : "btn btn-sm btn-outline-light mr-1"
                        }
                        onClick={() =>
                          setConfig({
                            ...config,
                            preset_fields: {
                              ...config.preset_fields,
                              [item]: "fuzzing",
                            },
                          })
                        }
                      >
                        Fuzzing
                      </button>

                      <button
                        type="button"
                        className={
                          config.preset_fields[item] === "default"
                            ? "btn btn-sm btn-primary mr-1"
                            : "btn btn-sm btn-outline-light mr-1"
                        }
                        onClick={() =>
                          setConfig({
                            ...config,
                            preset_fields: {
                              ...config.preset_fields,
                              [item]: "default",
                            },
                          })
                        }
                      >
                        Default
                      </button>
                    </div>
                  </div>
                );
              })
            : null}
        </Col>
        <Col md={4}>
          <h3>
            Scenario's:
            <select
              className="form-control"
              onChange={(event) => {
                addItem(event.target.value);
              }}
            >
              {Object.keys(templates).map((name) => {
                return <option>{name}</option>;
              })}
            </select>
          </h3>
          <Nestable
            items={tree}
            renderItem={renderItem}
            childrenProp={"values"}
            confirmChange={(dragItem, destinationParent) => {
              if (destinationParent == null) {
                return true;
              }
              if (
                destinationParent.type === "BitBuffer" ||
                destinationParent.type === "Loop" ||
                destinationParent.type === "SelectRandom"
              ) {
                return true;
              } else {
                return false;
              }
            }}
            onChange={(items) => setTree(items)}
          />
        </Col>
      </Row>
    </main>
  );
};
export default ConfigBuilder;
