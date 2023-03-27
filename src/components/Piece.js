import React, { useContext, useState, useEffect } from "react";
import Moving from "../data/Moving";
import BoardManage from "../data/Board";
import "./Piece.css";

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

const Piece = ({ piece, selectedColor, baseColor, borderRadius }) => {
  // ------ global variables ---------
  const { SetSelected, selected, action, changeCellItemSelected, round } =
    useContext(Moving);
  const { cellSize } = useContext(BoardManage);

  // -------- states -----------------
  const [rotate, setRotate] = useState(piece.rotated);
  const [flip, setFlip] = useState(piece.flip);

  // -------- styles -----------------
  let SelectedColor = selectedColor ?? "rgb(0, 106, 255)";
  let BaseColor = baseColor ?? "#fff";
  let BorderRadius = borderRadius ?? 0;

  // ---------------------------------
  // If a control item was tapped the
  // action (global variable) will change
  // and then the new infos will be set for the item
  // ---------------------------------
  useEffect(() => {
    if (selected.name === piece.name) {
      setRotate(selected.rotated);
      setFlip(selected.flip);
    }
  }, [action]);

  useEffect(() => {
    setRotate(0);
    setFlip(0);
  }, [round]);

  // ------------------------------------------
  // This will be called if the item was clicked
  // ------------------------------------------

  const chooseItem = (item) => {
    SetSelected(item);
    changeCellItemSelected("");
  };

  return (
    <div
      className="SpecialItem"
      onClick={() => chooseItem(piece)}
      style={{
        background: piece.name === selected.name ? SelectedColor : BaseColor,
        borderRadius: `${BorderRadius}px`,
      }}
    >
      <div
        style={{
          width: `${cellSize}px`,
          height: `${cellSize}px`,
        }}
      >
        <div
          style={{
            transform: `rotate(${rotate * 90}deg) rotateY(${flip * 180}deg)`,
          }}
        >
          {piece.name === "A0" ? (
            <A0 />
          ) : piece.name === "A1" ? (
            <A1 />
          ) : piece.name === "A2" ? (
            <A2 />
          ) : piece.name === "A3" ? (
            <A3 />
          ) : piece.name === "A4" ? (
            <A4 />
          ) : piece.name === "A5" ? (
            <A5 />
          ) : piece.name === "B0" ? (
            <B0 />
          ) : piece.name === "B1" ? (
            <B1 />
          ) : piece.name === "B2" ? (
            <B2 />
          ) : piece.name === "S0" ? (
            <S0 />
          ) : piece.name === "S1" ? (
            <S1 />
          ) : piece.name === "S2" ? (
            <S2 />
          ) : piece.name === "S3" ? (
            <S3 />
          ) : piece.name === "S4" ? (
            <S4 />
          ) : piece.name === "S5" ? (
            <S5 />
          ) : (
            ""
          )}
          {/* {piece.item} */}
        </div>
      </div>
    </div>
  );
};

export default Piece;
