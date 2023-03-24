import React, { useState, useContext, useEffect } from "react";
import Cell from "./Cell";
import "./Board.css";
import BoardTable from "../data/Board";

const Board = () => {
  const { board, windowSize, cellSize } = useContext(BoardTable);

  return (
    <div id="boardPlace" style={{
      height: windowSize.x < 769 ? `${windowSize.y * 0.8 - (cellSize + 10)}px` : `${windowSize.y}`
    }}>
      <div id="board">
        {board.map((row, y) => (
          <>
            <div className="row" key={y}>
              {row.map((cell, x) =>
                cell === null ? (
                  <Cell
                    key={`${y}${x}`}
                    borderColor="rgb(0, 106, 255)"
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
    </div>
  );
};

export default Board;
