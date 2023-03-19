import React, { useContext, useState, useEffect } from "react";
import Moving from "../data/Moving";
import "./Piece.css";

const Piece = ({ piece }) => {
  const { SetSelected, selected } = useContext(Moving);
 const [rotate, setRotate] = useState(piece.rotated);
 const [flip, setFlip] = useState(piece.flip);
 
 useEffect(() => {
  if (selected.name === piece.name){

  
  setRotate(selected.rotated);
  setFlip(selected.flip);
  }
 }, [selected.rotated, selected.flip]);

  const chooseItem = (item) => {
    SetSelected(item);
  };

  return (
    <div
      className="SpecialItem"
      onClick={() => chooseItem(piece)}
      style={{
        background: piece.name === selected.name ? "#f00" : "rgb(0, 106, 255)",
        transform: `rotate(${rotate * 90}deg) rotateY(${flip * 180}deg)`
      }}
    >
      {piece.item}
    </div>
  );
};

export default Piece;
