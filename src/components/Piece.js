import React, { useContext, useState, useEffect } from "react";
import Moving from "../data/Moving";
import "./Piece.css";

const Piece = ({ piece, selectedColor, baseColor, borderRadius }) => {
  let SelectedColor = selectedColor ?? "rgb(0, 106, 255)";
  let BaseColor = baseColor ?? "#fff";
  let BorderRadius = borderRadius ?? 0;
  const { SetSelected, selected, action } = useContext(Moving);
 const [rotate, setRotate] = useState(piece.rotated);
 const [flip, setFlip] = useState(piece.flip);
 
 useEffect(() => {
  if (selected.name === piece.name){

  setRotate(selected.rotated);
  setFlip(selected.flip);
  }
 }, [action]);

  const chooseItem = (item) => {
    SetSelected(item);
  };

  return (
    <div
      className="SpecialItem"
      onClick={() => chooseItem(piece)}
      style={{
        background: piece.name === selected.name ? SelectedColor : BaseColor,
        transform: `rotate(${rotate * 90}deg) rotateY(${flip * 180}deg)`,
        borderRadius: `${BorderRadius}px`
      }}
    >
      {piece.item}
    </div>
  );
};

export default Piece;
