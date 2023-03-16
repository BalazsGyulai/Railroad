import React from "react";
import Cell from "./Cell";
import Road from "../Rails/Road";
import Trail from "../Rails/Trail";

const Board = () => {
  const board = [
    ["wa", "wa", "ro", "wa", "ra", "wa", "ro", "wa", "wa"], // 1
    ["wa", null, null, null, null, null, null, null, "wa"], // 2
    ["ra01", null, null, null, null, null, null, null, "ra01"], // 3
    ["wa", null, null, null, null, null, null, null, "wa"], // 4
    ["ro01", null, null, null, null, null, null, null, "ro01"], // 5
    ["wa", null, null, null, null, null, null, null, "wa"], // 6
    ["ra01", null, null, null, null, null, null, null, "ra01"], // 7
    ["wa", null, null, null, null, null, null, null, "wa"], // 8
    ["wa", "wa", "ro", "wa", "ra", "wa", "ro", "wa", "wa"], // 9
  ];

  return (
    <div id="board">
      {board.map((row, i) => (
        <>
          <div className="row" key={i}>
            {row.map((cell, y) =>
              cell == null ? (
                <Cell
                  key={y}
                  borderColor="rgb(37, 171, 255)"
                  properties={cell}
                />
              ) : cell == "wa" ? (
                <Cell key={y} properties={cell} />
              ) : cell.slice(0, 2) == "ro" ? (
                <Cell key={y} properties={cell}>
                  <Road />
                </Cell>
              ) : cell.slice(0, 2) == "ra" ? (
                <Cell key={y} properties={cell}>
                  <Trail />
                </Cell>
              ) : (
                ""
              )
            )}
          </div>
        </>
      ))}
    </div>
  );
};

export default Board;
