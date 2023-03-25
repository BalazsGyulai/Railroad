import React, { useState, useContext, useEffect } from "react";
import A0 from "../Rails/A0";
import A1 from "../Rails/A1";
import A2 from "../Rails/A2";
import A3 from "../Rails/A3";
import A4 from "../Rails/A4";
import A5 from "../Rails/A5";
import B0 from "../Rails/B0";
import B1 from "../Rails/B1";
import B2 from "../Rails/B2";
import Piece from "./Piece";
import "./Normals.css";
import Moving from "../data/Moving";
import BoardManage from "../data/Board";

function NORMALS() {
  return [
    {
      name: "A0",
      item: <A0 />,
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "A1",
      item: <A1 />,
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "A2",
      item: <A2 />,
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "A3",
      item: <A3 />,
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "A4",
      item: <A4 />,
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "A5",
      item: <A5 />,
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "B0",
      item: <B0 />,
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "B1",
      item: <B1 />,
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "B2",
      item: <B2 />,
      rotated: 0,
      flip: 0,
      round: 0,
    },
  ];
}

const Normals = () => {
  const { round, action } = useContext(Moving);
  const { board } = useContext(BoardManage);
  const [normals, setNormals] = useState("");
  const [placedAllItem, setPlacedAllItems] = useState(false);

  useEffect(() => {
    let NewSpecials = new NORMALS();
    for (let i = 0; i < NewSpecials.length; i++) {
      NewSpecials[i].round = round;
    }

    setNormals(NewSpecials);
  }, [round]);

  useEffect(() => {
    let countPlacedItem = 0; // count the item which is placed in the round

    for (let y = 0; y < board.length; y++) {
      for (let x = 0; x < board[y].length; x++) {
        if (board[y][x] !== null && board[y][x].round === round && board[y][x].name[0] !== "S") {
          countPlacedItem += 1;
        }
      }
    }

    if (countPlacedItem >= 4) {
      setPlacedAllItems(true);
    } else {
      setPlacedAllItems(false);
    }

  }, [board, action]);

  return (
    <div id="normalsPlace">
      <div id="normals">
        {normals !== "" && !placedAllItem
          ? normals.map((normal, index) => (
              <Piece key={index} piece={normal} borderRadius={10} />
            ))
          : ""}
      </div>
    </div>
  );
};

export default Normals;
