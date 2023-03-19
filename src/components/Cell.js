import React, { useState, useEffect, useContext } from "react";
import "./Cell.css";
import Moving from "../data/Moving";
import BoardTable from "../data/Board";

const Cell = (props) => {
  const { SetSelected } = useContext(Moving);
  const { dropToCellHandler } = useContext(BoardTable);

  const [rotated, setRotated] = useState("0");
  const [droppedPiece, setDroppedPiece] = useState("");

  const initBorderColor = props.borderColor ?? "#fff";
  const initBorderLeftColor =
    props.borderLeftColor ?? initBorderColor ?? "#fff";
  const initBorderBottomColor =
    props.borderBottomColor ?? initBorderColor ?? "#fff";
  const initBorderRightColor =
    props.borderRightColor ?? initBorderColor ?? "#fff";
  const initBorderTopColor = props.borderTopColor ?? initBorderColor ?? "#fff";

  useEffect(() => {
    if (props.properties !== null) {
      setRotated(RotateHandler(props.properties.rotated));
      setDroppedPiece(props.properties.item);
    }
  }, [props.properties]);

  const RotateHandler = (val) => {
    return `${parseInt(val) * 90}deg`;
  };

  const DropSelectedPiece = (x, y) => {
    if (droppedPiece !== "" || droppedPiece !== null) {
      dropToCellHandler(x, y);
      SetSelected("");
    } else {
      console.log("selected a board item");
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
        onClick={() => DropSelectedPiece(props.position.x, props.position.y)}
      >
        {droppedPiece}
      </div>
    </div>
  );
};

export default Cell;
