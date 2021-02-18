import React, { useState } from "react";
import { Button } from "reactstrap";

const IntInput = (props) => {
  const [signed, setSigned] = useState(
    props.signed == null ? false : props.signed
  ); // Whether the value is signed or unsigned
  const [bits, setBits] = useState(props.bits == null ? 32 : props.bits); // The amount of bits that the input should use by default
  const [representation, setRepresentation] = useState(1); // The index of the number representation system, 0: binary, 1: decimal, 2: hexadecimal
  const [value, setValue] = useState(props.value == null ? 0 : props.value); // The value of the intinput
  const [error, setError] = useState(false); // Whether there is an error with the input, e.g. because it is invalid.
  const representations = [2, 10, 16]; // Number representation systems
  const representationPatterns = [/[^0-1]+/g, /[^-,0-9]+/g, /[^0-9a-fA-F]+/g]; // The Regexes to validate input for these systems.

  // Format the current value as a valid string.
  const formatString = () => {
    switch (representations[representation]) {
      case 2:
        return (value >>> 0).toString(2).padStart(bits, "0");
      case 10:
        return value;
      case 16:
        return (value >>> 0).toString(16).padStart(Math.ceil(bits / 4), "0");
      default:
        return "err";
    }
  };

  // Switch the sign of the value. Convert signed integers into unsigned and viceversa.
  const switchSign = () => {
    let newSign = !signed; // React state updates are not instant :/
    setSigned(newSign);
    let newVal;
    if (newSign) {
      newVal = (value << bits) >> bits;
    } else {
      newVal = value >>> 0;
    }
    setValue(newVal);
    props.onChange({ target: { value: newVal, signed: signed, bits: bits } });
  };

  // Fired when the value is changed, e.g. by typing. Event is built-in javascript event.
  const valueChange = (event) => {
    let val = event.target.value.replace(
      representationPatterns[representation],
      ""
    );
    if (!signed && val.indexOf("-") > -1) {
      // Sign is used while the value is supposed to be unsigned
      setValue(val.replace("-", "")); // Remove the sign
      return;
    }
    let parsedVal = parseInt(val, representations[representation]); // Parse as int.
    if (Object.is(NaN, parsedVal)) {
      // If the value is not an int, return.
      setValue(val); // Necessary to show the value on the controlled component
      setError(true);
      return;
    }
    // Check if there are any errors with the value, e.g. larger or smaller than the minimum
    // possible with the amount of bits.
    // TODO cleanup?
    setError(false);
    if (signed && parsedVal < -(2 ** (bits - 1))) {
      console.log("err 1");
      setError(true);
      // parsedVal = (-(2**(bits - 1)))
    } else if (signed && parsedVal > 2 ** (bits - 1) - 1) {
      console.log("err 2");
      setError(true);
      // parsedVal = (2**(bits - 1) -1)
    } else if (!signed && parsedVal > 2 ** bits - 1) {
      console.log("err 3");
      setError(true);
      // parsedVal = (2**(bits) -1)
    } else if (!signed && parsedVal < 0) {
      console.log("err 4");
      setError(true);
      // parsedVal = 0
    }
    setValue(parsedVal); // Set the value to show it on the controlled component
    props.onChange({
      target: { value: parsedVal, signed: signed, bits: bits },
    });
  };
  // Fired when the value of bits is changed, e.g. by typing into the bits field. Event parameter is built-in javascript event.
  const changeBits = (event) => {
    if (event.target.value > 32) {
      // A value larger than 32 bits is not allowed.
      setBits(32);
    } else {
      setBits(event.target.value); // Set the value to show it on the controlled component
    }
    // Check if there are any errors with the value now, e.g. larger or smaller than the
    //  minimum possible with the amount of bits.
    // TODO cleanup?
    setError(false);
    if (signed && value < -(2 ** (event.target.value - 1))) {
      console.log("err 1");
      setError(true);
      // parsedVal = (-(2**(bits - 1)))
    } else if (signed && value > 2 ** (event.target.value - 1) - 1) {
      console.log("err 2");
      setError(true);
      // parsedVal = (2**(bits - 1) -1)
    } else if (!signed && value > 2 ** event.target.value - 1) {
      console.log("err 3");
      setError(true);
      // parsedVal = (2**(bits) -1)
    } else if (!signed && value < 0) {
      console.log("err 4");
      setError(true);
      // parsedVal = 0
    }
    // Trigger the onChange at the parent.
    props.onChange({
      target: { value: value, signed: signed, bits: event.target.value },
    });
  };

  return (
    <div className="intInput">
      <div>
        {props.signed !== null ? (
          <Button outline color="primary" onClick={() => switchSign()}>
            {signed ? "±" : "+"}
          </Button>
        ) : null}
      </div>
      <div>
        <div className="input-group">
          <input
            type="text"
            className={error ? "form-control error" : "form-control"}
            value={formatString()}
            onChange={(event) => valueChange(event)}
          />
          <input
            type="numeric"
            className={error ? "form-control error" : "form-control"}
            value={bits}
            onChange={(event) => changeBits(event)}
            placeholder="bits"
            style={{ width: "30px" }}
          />
          <Button
            outline
            color="primary"
            onClick={() => setRepresentation((representation + 1) % 3)}
          >
            {representations[representation]}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default IntInput;
