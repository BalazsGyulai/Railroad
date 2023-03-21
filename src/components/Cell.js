import React, { useState, useEffect, useContext } from "react";
import "./Cell.css";
import Moving from "../data/Moving";
import BoardTable from "../data/Board";

const Cell = (props) => {
  const {
    SetSelected,
    action,
    round,
    updateCellItemSelected,
  } = useContext(Moving);
  const { dropToCellHandler } = useContext(BoardTable);

  const [rotated, setRotated] = useState("0");
  const [flipped, setFlipped] = useState(0);
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
      setFlipped(props.properties.flip);
      setDroppedPiece(props.properties.item);
    } else {
      setDroppedPiece(props.properties);
    }
  }, [props.properties, action]);

  const RotateHandler = (val) => {
    return `${parseInt(val) * 90}deg`;
  };

  const DropSelectedPiece = (x, y) => {
    if (props.properties === null) {
      dropToCellHandler(x, y);
      SetSelected("");
    } else if (props.properties.round === round) {
      updateCellItemSelected(x, y);
      SetSelected(props.properties);
    }
    // console.log(props.properties);
    // if (droppedPiece !== "" || droppedPiece !== null) {
    //   dropToCellHandler(x, y);
    //   SetSelected("");
    // } else {
    //   // SetSelected(props.properties);
    //   console.log("clicked on cell item");
    // }
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
        onClick={() => DropSelectedPiece(props.position.x, props.position.y)}
      >
        <div
          className="droppedpiece"
          style={{
            transform: `rotate(${rotated}) rotateY(${flipped * 180}deg)`,
          }}
        >
          {droppedPiece}
        </div>
        {props.properties !== null && props.properties.round !== 0 ? (
          <div className="round">
            {props.properties.round !== "0" ? props.properties.round : ""}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Cell;
