import React, { useState, useContext, useEffect } from "react";
import Cell from "./Cell";
import BoardTable from "../data/Board";

const Board = () => {
  const { board } = useContext(BoardTable);

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
                />
              ) : (
                <Cell
                  key={`${y}${x}`}
                  properties={cell}
                  position={{ x: x, y: y }}
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
