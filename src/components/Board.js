import React, { useState, useContext } from "react";
import Cell from "./Cell";
import Road from "../Rails/Road";
import Trail from "../Rails/Trail";
import Moving from "../data/Moving";

const BOARD = [
  [
    {
      name: "wa",
      item: "",
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "wa",
      item: "",
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "ro",
      item: <Road />,
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "wa",
      item: "",
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "ra",
      item: <Trail />,
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "wa",
      item: "",
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "ro",
      item: <Road />,
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "wa",
      item: "",
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "wa",
      item: "",
      rotated: 0,
      flip: 0,
      round: 0,
    },
  ], // 1
  [
    {
      name: "wa",
      item: "",
      rotated: 0,
      flip: 0,
      round: 0,
    },
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    {
      name: "wa",
      item: "",
      rotated: 0,
      flip: 0,
      round: 0,
    },
  ], // 2
  [
    {
      name: "ra",
      item: <Trail />,
      rotated: 1,
      flip: 0,
      round: 0,
    },
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    {
      name: "ra",
      item: <Trail />,
      rotated: 1,
      flip: 0,
      round: 0,
    },
  ], // 3
  [
    {
      name: "wa",
      item: "",
      rotated: 0,
      flip: 0,
      round: 0,
    },
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    {
      name: "wa",
      item: "",
      rotated: 0,
      flip: 0,
      round: 0,
    },
  ], // 4
  [
    {
      name: "ro",
      item: <Road />,
      rotated: 1,
      flip: 0,
      round: 0,
    },
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    {
      name: "ro",
      item: <Road />,
      rotated: 1,
      flip: 0,
      round: 0,
    },
  ], // 5
  [
    {
      name: "wa",
      item: "",
      rotated: 0,
      flip: 0,
      round: 0,
    },
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    {
      name: "wa",
      item: "",
      rotated: 0,
      flip: 0,
      round: 0,
    },
  ], // 6
  [
    {
      name: "ra",
      item: <Trail />,
      rotated: 1,
      flip: 0,
      round: 0,
    },
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    {
      name: "ra",
      item: <Trail />,
      rotated: 1,
      flip: 0,
      round: 0,
    },
  ], // 7
  [
    {
      name: "wa",
      item: "",
      rotated: 0,
      flip: 0,
      round: 0,
    },
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    {
      name: "wa",
      item: "",
      rotated: 0,
      flip: 0,
      round: 0,
    },
  ], // 8
  [
    {
      name: "wa",
      item: "",
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "wa",
      item: "",
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "ro",
      item: <Road />,
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "wa",
      item: "",
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "ra",
      item: <Trail />,
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "wa",
      item: "",
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "ro",
      item: <Road />,
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "wa",
      item: "",
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "wa",
      item: "",
      rotated: 0,
      flip: 0,
      round: 0,
    },
  ], // 9
];

const Board = () => {
  const { selected } = useContext(Moving);
  const [board, setBoard] = useState(BOARD);

  const [selectedCell, setSelectedCell] = useState(null);

  const dropToCellHandler = (pos) => {
    let newBoard = board;
    newBoard[pos.y][pos.x] = selected;

    setBoard(newBoard);
  };
  return (
    <div id="board">
      {board.map((row, y) => (
        <>
          <div className="row" key={y}>
            {row.map((cell, x) =>
              cell === null ? (
                <Cell
                  key={`${y}${x}`}
                  borderColor="rgb(37, 171, 255)"
                  properties={cell}
                  position={{ x: x, y: y }}
                  dropToCell={(dropToCell) => dropToCellHandler(dropToCell)}
                />
              ) : (
                <Cell
                  key={`${y}${x}`}
                  properties={cell}
                  position={{ x: x, y: y }}
                  dropToCell={(dropToCell) => dropToCellHandler(dropToCell)}
                />
              )
            )}
          </div>
        </>
      ))}
    </div>
  );
};

export default Board;
