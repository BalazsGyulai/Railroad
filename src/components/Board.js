import React, { useState, useContext, useEffect } from "react";
import Cell from "./Cell";
import "./Board.css";
import BoardTable from "../data/Board";
import Moving from "../data/Moving";
import NextArrow from "../Icons/NextArrow";

const Board = () => {
  const { board, windowSize, cellSize } = useContext(BoardTable);
  const { NextRoundHandler, round } = React.useContext(Moving);

  return (
    <div id="boardHolder">
      <div
        className="statsHolder"
        style={{
          height: `${cellSize + 10}px`,
        }}
      >
        <div className="RoundHolder" style={{
          width: `${(cellSize * 0.7) * 2}px`,
          height: `${cellSize * 0.7}px`
        }}>
          <div className="RoundDisplay" style={{
          width: `${cellSize * 0.7}px`,
          height: `${cellSize * 0.7}px`
          }}>
          {round}
          </div>
          <div
            className="nextRoundBtn"
            onClick={() => NextRoundHandler()}
            style={{
              width:  `${(cellSize * 0.7) * 2 - (cellSize * 0.7) / 2}px`,
              padding: `5px 5px 5px ${((cellSize * 0.7) / 2 + 5)}px`,
              borderRadius: `0 ${cellSize/2}px ${cellSize/2}px 0`
            }}
          >
            <NextArrow />
          </div>
        </div>
      </div>

      <div
        id="boardPlace"
        style={{
          height:
            windowSize.x < 769
              ? `${windowSize.y - (cellSize + 10) * 4 - 5}px`
              : `${windowSize.y - (cellSize + 10)}px`,
        }}
      >
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
    </div>
  );
};

export default Board;
