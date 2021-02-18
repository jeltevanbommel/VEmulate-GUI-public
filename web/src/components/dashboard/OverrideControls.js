import IntInput from "components/dashboard/IntInput";
import React, { useState } from "react";
import { Input } from "reactstrap";

const OverrideControls = (props) => {
  const [controls, setControls] = useState(
    props.item.controls.length > 2 ? 2 : 0
  ); // The current control is an integer

  const nextControl = (leng) => {
    setControls((controls + 1) % leng);
  }; // The next control is the current control +1, but this cannot go higher than the amount of controls, so modulo the amount of controls (leng param).

  return (
    <>
      <td className="flex">
        {props.item.controls.map((control, index) => {
          switch (control.type) {
            case "intInput":
              return (
                <div
                  key={"c" + props.item.key + "-" + index}
                  className={
                    controls === index ? "mt-2 mb-2" : "hidden mt-2 mb-2"
                  }
                >
                  <IntInput
                    signed={props.item.signed}
                    bits={props.item.bits}
                    value={
                      controls === index && props.overridden
                        ? props.overrideValue
                        : props.item.default
                    }
                    onChange={(event) =>
                      props.onChangInput(
                        props.item.key,
                        event,
                        props.item.text,
                        event.target.bits,
                        event.target.signed
                      )
                    }
                  />
                </div>
              );
            case "dropdown":
              return (
                <div
                  key={"c" + props.item.key + "-" + index}
                  className={
                    controls === index ? "mt-2 mb-2" : "hidden mt-2 mb-2"
                  }
                >
                  <Input
                    type="select"
                    name="select"
                    className="emphasized_selector"
                    onChange={(event) =>
                      props.onChangInput(
                        props.item.key,
                        event,
                        props.item.text,
                        props.item.bits,
                        props.item.signed
                      )
                    }
                  >
                    <option value=""> </option>
                    {Object.keys(control.values).map((key) => {
                      return (
                        <option key={key} value={control.values[key]}>
                          {control.values[key]}: {key}
                        </option>
                      );
                    })}
                  </Input>
                </div>
              );
            case "stringInput": // TODO custom properties for hex etc.  Placeholder
              return (
                <div
                  key={"c" + props.item.key + "-" + index}
                  className={
                    controls === index ? "mt-2 mb-2" : "hidden mt-2 mb-2"
                  }
                >
                  <input
                    onChange={(event) =>
                      props.onChangInput(
                        props.item.key,
                        event,
                        props.item.text,
                        props.item.bits,
                        props.item.signed
                      )
                    }
                    type="text"
                    className="form-control"
                    value={
                      controls === index && props.overridden
                        ? props.overrideValue
                        : props.item.default
                    }
                  />
                </div>
              );
            case "range":
              return (
                <div
                  key={"c" + props.item.key + "-" + index}
                  className={controls === index ? "mt-2" : "hidden mt-2"}
                >
                  <input
                    type="range"
                    className="form-range"
                    min={control.min}
                    max={control.max}
                    onChange={(event) =>
                      props.onChangInput(
                        props.item.key,
                        event,
                        props.item.text,
                        props.item.bits,
                        props.item.signed
                      )
                    }
                    step="1"
                    value={
                      controls === index && props.overridden
                        ? props.overrideValue
                        : props.item.default
                    }
                  />
                  <div className="d-flex justify-content-between">
                    <small className="text-muted">{control.min}</small>
                    <small>{props.overrideValue}</small>
                    <small className="text-muted">{control.max}</small>
                  </div>
                </div>
              );
            default:
              return null;
          }
        })}
      </td>
      <td>
        <span data-abc="true" style={{ cursor: "pointer" }}>
          <span
            className="badge bg-primary-lt text-uppercase"
            onClick={() => nextControl(props.item.controls.length)}
          >
            <i className="fas fa-retweet" />
          </span>
        </span>
      </td>
    </>
  );
};
export default OverrideControls;
