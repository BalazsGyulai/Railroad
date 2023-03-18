import React, { useContext } from "react";
import Moving from "../data/Moving";
import "./Piece.css";

const Piece = ({ piece }) => {
  const { SetSelected, selected} = useContext(Moving);
  const chooseItem = (item) => {
    SetSelected(item);
  };

  return (
    <div className="SpecialItem" onClick={() => chooseItem(piece)} style={{background: piece.name === selected.name ? "#f00" : "rgb(0, 106, 255)"}}>
      {piece.item}
    </div>
  );
};

export default Piece;
