import React, { useState, useEffect, useContext } from "react";
import "./Cell.css";
import Moving from "../data/Moving";
import BoardTable from "../data/Board";

import A0 from "../Rails/A0";
import A1 from "../Rails/A1";
import A2 from "../Rails/A2";
import A3 from "../Rails/A3";
import A4 from "../Rails/A4";
import A5 from "../Rails/A5";
import B0 from "../Rails/B0";
import B1 from "../Rails/B1";
import B2 from "../Rails/B2";
import S0 from "../Rails/S0";
import S1 from "../Rails/S1";
import S2 from "../Rails/S2";
import S3 from "../Rails/S3";
import S4 from "../Rails/S4";
import S5 from "../Rails/S5";
import Road from "../Rails/Road";
import Trail from "../Rails/Trail";
import WA from "../Icons/WA";

const Cell = (props) => {
  const {
    SetSelected,
    action,
    round,
    updateCellItemSelected,
    changeCellItemSelected,
  } = useContext(Moving);
  const { dropToCellHandler, cellSize } = useContext(BoardTable);

  // const [cellSize, setCellSize] = useState(65);
  // const [windowSize, setWindowSize] = useState({
  //   x: window.innerWidth,
  //   y: window.innerHeight,
  // });
  const [rotated, setRotated] = useState("0");
  const [flipped, setFlipped] = useState(0);

  const initBorderColor = props.borderColor ?? "#fff";
  const initBorderLeftColor =
    props.borderLeftColor ?? initBorderColor ?? "#fff";
  const initBorderBottomColor =
    props.borderBottomColor ?? initBorderColor ?? "#fff";
  const initBorderRightColor =
    props.borderRightColor ?? initBorderColor ?? "#fff";
  const initBorderTopColor = props.borderTopColor ?? initBorderColor ?? "#fff";
  const initFillColor =
    props.properties !== null ? props.properties.fill ?? "#000" : "#000";
  const selectable = props.selectable ?? false;

  useEffect(() => {
    if (props.properties !== null) {
      setRotated(RotateHandler(props.properties.rotated));
      setFlipped(props.properties.flip);
    }
  }, [props.properties, action]);

  const RotateHandler = (val) => {
    return `${parseInt(val) * 90}deg`;
  };

  const DropSelectedPiece = (x, y) => {
    if (props.properties === null) {
      dropToCellHandler(x, y);
      changeCellItemSelected("");
      SetSelected("");
    } else if (props.properties.round === round) {
      updateCellItemSelected(x, y);
      SetSelected(props.properties);
    }
  };

  return (
    <div
      className="cell"
      style={{
        width: `${cellSize}px`,
        height: `${cellSize}px`,
        borderColor: initBorderColor,
        borderLeftColor: initBorderLeftColor,
        borderBottomColor: initBorderBottomColor,
        borderRightColor: initBorderRightColor,
        borderTopColor: initBorderTopColor,
        background:
          selectable === "enable"
            ? "#97DB4F"
            : props.position.x <= 5 &&
              props.position.x >= 3 &&
              props.position.y <= 5 &&
              props.position.y >= 3
            ? "#d6e7ff"
            : "#fff",
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
          {props.properties !== null ? (
            props.properties.name === "A0" ? (
              <A0 />
            ) : props.properties.name === "A1" ? (
              <A1 />
            ) : props.properties.name === "A2" ? (
              <A2 />
            ) : props.properties.name === "A3" ? (
              <A3 />
            ) : props.properties.name === "A4" ? (
              <A4 />
            ) : props.properties.name === "A5" ? (
              <A5 />
            ) : props.properties.name === "B0" ? (
              <B0 />
            ) : props.properties.name === "B1" ? (
              <B1 />
            ) : props.properties.name === "B2" ? (
              <B2 />
            ) : props.properties.name === "S0" ? (
              <S0 />
            ) : props.properties.name === "S1" ? (
              <S1 />
            ) : props.properties.name === "S2" ? (
              <S2 />
            ) : props.properties.name === "S3" ? (
              <S3 />
            ) : props.properties.name === "S4" ? (
              <S4 />
            ) : props.properties.name === "S5" ? (
              <S5 />
            ) : props.properties.name === "wa" ? (
              <WA />
            ) : props.properties.name === "ro" ? (
              <Road />
            ) : props.properties.name === "ra" ? (
              <Trail />
            ) : (
              ""
            )
          ) : (
            ""
          )}

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
