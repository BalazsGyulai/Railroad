import React, { useState, useEffect, useContext } from "react";
import "./Cell.css";
import Moving from "../data/Moving";

const Cell = (props) => {
  const { SetSelected, selected, UnselectTheSelectedPiece } =
    useContext(Moving);
  const [rotated, setRotated] = useState("0");
  const [droppedPiece, setDroppedPiece] = useState("");

  const type = props.properties?.slice(0, 2);
  let rotate = props.properties?.slice(2, 4);

  const initBorderColor = props.borderColor ?? "#fff";
  const initBorderLeftColor =
    props.borderLeftColor ?? initBorderColor ?? "#fff";
  const initBorderBottomColor =
    props.borderBottomColor ?? initBorderColor ?? "#fff";
  const initBorderRightColor =
    props.borderRightColor ?? initBorderColor ?? "#fff";
  const initBorderTopColor = props.borderTopColor ?? initBorderColor ?? "#fff";

  useEffect(() => {
    setRotated(RotateHandler(rotate));
  }, []);

  const RotateHandler = (val) => {
    if (parseInt(val) > 4) {
      rotate = 0;
    } else if (parseInt(val) < 0) {
      rotate = 4;
    }

    return `${parseInt(rotate) * 90}deg`;
  };

  const DropSelectedPiece = () => {
    if (droppedPiece === "") {
      setDroppedPiece(selected);
    } else {
      SetSelected(droppedPiece);
    }
  };

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
      <div
        className="object"
        style={{ transform: `rotate(${rotated})` }}
        onClick={() => DropSelectedPiece()}
      >
        {droppedPiece.item}
        {props.children}
      </div>
    </div>
  );
};

export default Cell;
