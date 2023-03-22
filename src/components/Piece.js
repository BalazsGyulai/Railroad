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
  const [PieceSize, setPieceSize] = useState(0);

  
  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });
  
  useEffect(() => {
    if (selected.name === piece.name) {
      setRotate(selected.rotated);
      setFlip(selected.flip);
    }
  }, [action]);

  useEffect(() => {
    handleWindowResize();
  })

  const handleWindowResize = () => {
    let x = window.innerWidth;
    let y = window.innerHeight;

    if (x < 769) {
      if (y / 2 < x) {
        setPieceSize(y / 2 / 9);
      } else {
        setPieceSize(x / 9);
      }
    } else {
      if (x / 2 < y) {
        if (x / 2 / 9 > 65) {
          setPieceSize(65);
        } else {
          setPieceSize(x / 2 / 9);
        }
      } else {
        if (y / 9 > 65) {
          setPieceSize(65);
        } else {
          setPieceSize(y / 9);
        }
      }
    }
  };

  const chooseItem = (item) => {
    SetSelected(item);
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
          width: `${PieceSize}px`,
          height: `${PieceSize}px`,
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
