import React, { useContext, useState, useEffect } from "react";
import Moving from "../data/Moving";
import BoardManage from "../data/Board";
import "./Piece.css";

const Piece = ({ piece, selectedColor, baseColor, borderRadius }) => {

  // ------ global variables ---------
  const { SetSelected, selected, action, updateCellItemSelected } = useContext(Moving);
  const {cellSize} = useContext(BoardManage);

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

  // ------------------------------------------
  // This will be called if the item was clicked
  // ------------------------------------------

  const chooseItem = (item) => {
    SetSelected(item);
    updateCellItemSelected("");
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
          {piece.item}
        </div>
      </div>
    </div>
  );
};

export default Piece;
