import React, { useState, useEffect } from "react";
import "./Cell.css";

const Cell = (props) => {
  const type = props.properties?.slice(0,2);
  let rotate = props.properties?.slice(2,4);

    console.log(`${type}  ${rotate}`);

  const initBorderColor = props.borderColor ?? "#fff";
  const initBorderLeftColor =
    props.borderLeftColor ?? initBorderColor ?? "#fff";
  const initBorderBottomColor =
    props.borderBottomColor ?? initBorderColor ?? "#fff";
  const initBorderRightColor =
    props.borderRightColor ?? initBorderColor ?? "#fff";
  const initBorderTopColor = props.borderTopColor ?? initBorderColor ?? "#fff";

  const [rotated, setRotated] = useState("0");

  useEffect(() => {
    setRotated(RotateHandler(rotate));
  }, [])

  const RotateHandler = (val) => {
    if (parseInt(val) > 4) {
      rotate = 0;
    } else if (parseInt(val) < 0) {
      rotate = 4;
    }

    return `${parseInt(rotate) * 90}deg`
  }


  return (
    <div
      className="cell"
      style={{
        borderColor: initBorderColor,
        borderLeftColor: initBorderLeftColor,
        borderBottomColor: initBorderBottomColor,
        borderRightColor: initBorderRightColor,
        borderTopColor: initBorderTopColor,
      }}
    >
      <div className="object" style={{ transform: `rotate(${rotated})` }}>
        {props.children}
      </div>
    </div>
  );
};

export default Cell;
