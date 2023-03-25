import React, { useState, useContext, useEffect } from "react";
import Cell from "./Cell";
import "./Board.css";
import BoardTable from "../data/Board";
import Moving from "../data/Moving";
import NextArrow from "../Icons/NextArrow";

const Board = () => {
  const { board, windowSize, cellSize, newItem } = useContext(BoardTable);
  const { NextRoundHandler, round, selected, action } = useContext(Moving);

  const [calculate, setCalculate] = useState("");
  const [enabledCells, setEnabledCells] = useState("");

  useEffect(() => {
    handlerCalculate(board);
  }, []);

  useEffect(() => {
    handlerCalculate(board);
  }, [board, action]);

  useEffect(() => {
    handleEmptyCells(board);
  }, [selected, action, board]);

  const handleEmptyCells = (board) => {
    let EnableToPlace = [];

    // init table
    for (let y = 0; y < board.length; y++) {
      let row = [];
      for (let x = 0; x < board[y].length; x++) {
        row.push(null);
      }
      EnableToPlace.push(row);
    }

    console.log(selected.rotated);
    console.log(selected.flip);


    if (selected !== "" && selected !== null) {
      for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
          if (board[y][x] !== null) {
            if (board[y][x].look && selected.look) {
              // is the top of the placed item equal with the bottom of the selected item but not null
              if (y - 1 > 0) {
                if (
                  board[y][x].look[
                    (0 + ((4 - board[y][x].rotated) % 4)) % 4
                  ] === selected.look[(2 + ((4 - selected.rotated) % 4)) % 4] &&
                  board[y][x].look[
                    (0 + ((4 - board[y][x].rotated) % 4)) % 4
                  ] !== null &&
                  selected.look[(2 + ((4 - selected.rotated) % 4)) % 4] !== null
                ) {
                  EnableToPlace[y - 1][x] = "enable";
                } else {
                  EnableToPlace[y - 1][x] = null;
                }
              }

              // is the bottom of the placed item equal with the top of the selected item but not null
              if (y + 1 < board.length) {
                if (
                  board[y][x].look[
                    (2 + ((4 - board[y][x].rotated) % 4)) % 4
                  ] === selected.look[(0 + ((4 - selected.rotated) % 4)) % 4] &&
                  board[y][x].look[
                    (2 + ((4 - board[y][x].rotated) % 4)) % 4
                  ] !== null &&
                  selected.look[(0 + ((4 - selected.rotated) % 4)) % 4] !== null
                ) {
                  EnableToPlace[y + 1][x] = "enable";
                } else {
                  EnableToPlace[y + 1][x] = null;
                }
              }

              // is the right side of the placed item equal with the left side of the selected item but not null
              if (x + 1 < board[y].length) {
                if (
                  board[y][x].look[
                    (1 + ((4 - board[y][x].rotated) % 4)) % 4
                  ] === selected.look[(3 + ((4 - selected.rotated) % 4)) % 4] &&
                  board[y][x].look[
                    (1 + ((4 - board[y][x].rotated) % 4)) % 4
                  ] !== null &&
                  selected.look[(3 + ((4 - selected.rotated) % 4)) % 4] !== null
                ) {
                  EnableToPlace[y][x + 1] = "enable";
                } else {
                  EnableToPlace[y][x + 1] = null;
                }
              }

              // is the left side of the placed item equal with the right side of the selected item but not null
              if (x - 1 > 0) {
                if (
                  board[y][x].look[
                    (3 + ((4 - board[y][x].rotated) % 4)) % 4
                  ] === selected.look[(1 + ((4 - selected.rotated) % 4)) % 4] &&
                  board[y][x].look[
                    (3 + ((4 - board[y][x].rotated) % 4)) % 4
                  ] !== null &&
                  selected.look[(1 + ((4 - selected.rotated) % 4)) % 4] !== null
                ) {
                  EnableToPlace[y][x - 1] = "enable";
                } else {
                  EnableToPlace[y][x - 1] = null;
                }
              }
            }
          }
        }
      }
    }
    // console.log(selected.look[(3 + (4 - selected.rotated) % 4) % 4]);
    setEnabledCells(EnableToPlace);
  };

  const handlerCalculate = (board) => {
    let CalculateBoard = board;

    // for(let y = 0; y < CalculateBoard.length; y++){
    //   for(let x = 0; x < CalculateBoard[y].length; x++){
    //     if ()
    //   }
    // }

    // console.log(CalculateBoard);
  };

  return (
    <div id="boardHolder">
      <div
        className="statsHolder"
        style={{
          height: `${cellSize + 10}px`,
        }}
      >
        <div
          className="RoundHolder"
          style={{
            width: `${cellSize * 0.7 * 2}px`,
            height: `${cellSize * 0.7}px`,
          }}
        >
          <div
            className="RoundDisplay"
            style={{
              width: `${cellSize * 0.7}px`,
              height: `${cellSize * 0.7}px`,
            }}
          >
            {round}
          </div>
          <div
            className="nextRoundBtn"
            onClick={() => NextRoundHandler()}
            style={{
              width: `${cellSize * 0.7 * 2 - (cellSize * 0.7) / 2}px`,
              padding: `5px 5px 5px ${(cellSize * 0.7) / 2 + 5}px`,
              borderRadius: `0 ${cellSize / 2}px ${cellSize / 2}px 0`,
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
                      selectable={enabledCells !== "" ? enabledCells[y][x] : null}
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
