import React, { useState, useContext, useEffect } from "react";
import Piece from "./Piece";
import "./Normals.css";
import Moving from "../data/Moving";
import BoardManage from "../data/Board";
import LoginData from "../data/Login";

function NORMALS() {
  return [
    {
      name: "A0",
      rotated: 0,
      flip: 0,
      round: 0,
      look: ["s", null, null, "s"],
    },
    {
      name: "A1",
      rotated: 0,
      flip: 0,
      round: 0,
      look: ["s", "s", null, "s"],
    },
    {
      name: "A2",
      rotated: 0,
      flip: 0,
      round: 0,
      look: ["s", null, "s", null],
    },
    {
      name: "A3",
      rotated: 0,
      flip: 0,
      round: 0,
      look: ["u", null, null, "u"],
    },
    {
      name: "A4",
      rotated: 0,
      flip: 0,
      round: 0,
      look: ["u", "u", null, "u"],
    },
    {
      name: "A5",
      rotated: 0,
      flip: 0,
      round: 0,
      look: ["u", null, "u", null],
    },
    {
      name: "B0",
      rotated: 0,
      flip: 0,
      round: 0,
      look: ["u", "s", "u", "s"],
    },
    {
      name: "B1",
      rotated: 0,
      flip: 0,
      round: 0,
      look: ["s", null, "u", null],
    },
    {
      name: "B2",
      rotated: 0,
      flip: 0,
      round: 0,
      look: ["s", null, null, "u"],
    },
  ];
}

function NewItem(val) {
  return val;
}

const Normals = () => {
  const { loggedIn, baseURL, mode, page } = useContext(LoginData);
  const { round, action, placedAllItem, updatePlacedAllItems } =
    useContext(Moving);
  const { board } = useContext(BoardManage);
  const [normals, setNormals] = useState("");

  useEffect(() => {
    if (loggedIn && mode === "multiPlayer") {
      getRolledPieces();
    } else {
      // let NewSpecials = new NORMALS();
      // for (let i = 0; i < NewSpecials.length; i++) {
      //   NewSpecials[i].round = round;
      // }

      // setNormals(NewSpecials);

      setNormals(
        updateItemsRound(new NORMALS(), round)
      );
    }
  }, [round, page]);

  useEffect(() => {
    getRolledPieces();
  }, []);

  const updateItemsRound = (changeArray, element) => {
    let NewSpecials = new NewItem(changeArray);
    for (let i = 0; i < NewSpecials.length; i++) {
      NewSpecials[i].round = round;
    }

    return NewSpecials;
  };

  const getRolledPieces = async () => {
    fetch(`${baseURL}rolled.php`, {
      method: "post",
      body: JSON.stringify({
        code: JSON.parse(sessionStorage.getItem("user")).code,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.status === "ok") {
          setNormals(
            updateItemsRound(JSON.parse(data.rolled.rolled), data.rolled.round)
          );
        } else if (data.status === "failed to connect") {
          console.log("failed to connect");
        } else {
          console.log("something is wrong");
        }
      });
  };

  useEffect(() => {
    let countPlacedItem = 0; // count the item which is placed in the round

    for (let y = 0; y < board.length; y++) {
      for (let x = 0; x < board[y].length; x++) {
        if (
          board[y][x] !== null &&
          board[y][x].round === round &&
          board[y][x].name[0] !== "S"
        ) {
          countPlacedItem += 1;
        }
      }
    }

    if (countPlacedItem >= 4) {
      updatePlacedAllItems(true);
    } else {
      updatePlacedAllItems(false);
    }
  }, [board, action]);

  return (
    <div id="normalsPlace">
      <div id="normals">
        {normals !== "" && !placedAllItem
          ? normals.map((normal, index) => (
              <Piece
                key={index}
                item={index}
                piece={normal}
                borderRadius={10}
                clickable={true}
              />
            ))
          : ""}
      </div>
    </div>
  );
};

export default Normals;
