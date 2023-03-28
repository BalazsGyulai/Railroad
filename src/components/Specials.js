import React, { useContext, useEffect, useState } from "react";
import S0 from "../Rails/S0";
import S1 from "../Rails/S1";
import S2 from "../Rails/S2";
import S3 from "../Rails/S3";
import S4 from "../Rails/S4";
import S5 from "../Rails/S5";
import "./Specials.css";
import Piece from "./Piece";
import Moving from "../data/Moving";
import BoardManage from "../data/Board";

function SPECIALS() {
  return [
    {
      name: "S0",
      rotated: 0,
      flip: 0,
      round: 0,
      look: ["u", "u", "s", "u"]
    },
    {
      name: "S1",
      rotated: 0,
      flip: 0,
      round: 0,
      look: ["s", "s", "u", "s"]
    },
    {
      name: "S2",
      rotated: 0,
      flip: 0,
      round: 0,
      look: ["u", "u", "u", "u"]
    },
    {
      name: "S3",
      rotated: 0,
      flip: 0,
      round: 0,
      look: ["s", "s", "s", "s"]
    },
    {
      name: "S4",
      rotated: 0,
      flip: 0,
      round: 0,
      look: ["u", "s", "s", "u"]
    },
    {
      name: "S5",
      rotated: 0,
      flip: 0,
      round: 0,
      look: ["u", "s", "u", "s"]
    },
  ];
}

const Specials = () => {
  const { round, action } = useContext(Moving);
  const { board } = useContext(BoardManage);
  const [specials, setSpecials] = useState("");

  useEffect(() => {
    let NewSpecials = new SPECIALS();

    for (let i = 0; i < NewSpecials.length; i++) {
      NewSpecials[i].round = round;
    }

    deleteUsedItem(board, NewSpecials);

    if (NewSpecials.length < 4) {
      NewSpecials = "";
    }

    setSpecials(NewSpecials);
  }, [round, board, action]);

  const deleteUsedItem = (board, array, usedItem) => {
    let modifyArray = array;

    for (let y = 0; y < board.length; y++) {
      for (let x = 0; x < board[y].length; x++) {
        for (let i = 0; i < modifyArray.length; i++) {
          if (board[y][x] !== null) {
            if (modifyArray[i].name === board[y][x].name) {
              modifyArray.splice(i, 1);
            }
          }
        }
      }
    }
  };

  return (
    <div id="SpecialsHolder">
      {specials.length >= 4 ? (
        <div className="SpecialsLeft">{specials.length - 3}</div>
      ) : (
        ""
      )}
      <div id="SpecialsPlace">
        <div id="Specials">
          {specials !== ""
            ? specials.map((special, index) => (
                <Piece
                  key={`${round}${index}`}
                  piece={special}
                  selectedColor="#fff"
                  baseColor="rgb(0, 106, 255)"
                  clickable={true}
                />
              ))
            : ""}
        </div>
      </div>
    </div>
  );
};

export default Specials;
