import React, { useState, useContext, useEffect } from "react";
import Cell from "./Cell";
import "./Board.css";
import BoardTable from "../data/Board";
import Moving from "../data/Moving";
import NextArrow from "../Icons/NextArrow";

const Board = () => {
  const { board, windowSize, cellSize } = useContext(BoardTable);
  const { NextRoundHandler, round, selected, action, cellItemSelected } =
    useContext(Moving);

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
  }, [selected, action, board, cellItemSelected]);

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

    if (selected !== "" && selected !== null && cellItemSelected === "") {
      // make it enable
      // console.log(selected.look);
      for (let y = 1; y < board.length - 1; y++) {
        for (let x = 1; x < board[y].length - 1; x++) {

          // top --- bottom
          if (board[y - 1][x] !== null && board[y - 1][x].look && selected.look) {
            if (elementNotEmpty(selected.look[0]) && elementNotEmpty(board[y - 1][x].look[2]) && selected.look[0] === board[y - 1][x].look[2]) {
              EnableToPlace[y][x] = "enable";
            }
          }

          // left --- right
          if (board[y][x + 1] !== null && board[y][x + 1].look && selected.look) {
            if (elementNotEmpty(selected.look[1]) && elementNotEmpty(board[y][x + 1].look[3]) && selected.look[1] === board[y][x + 1].look[3]) {
              EnableToPlace[y][x] = "enable";
            }
          }

          // bottom --- top
          if (board[y + 1][x] !== null && board[y + 1][x].look && selected.look) {
            if (elementNotEmpty(selected.look[2]) && elementNotEmpty(board[y + 1][x].look[0]) && selected.look[2] === board[y + 1][x].look[0]) {
              EnableToPlace[y][x] = "enable";
            }
          }

          // right --- left
          if (board[y][x - 1] !== null && board[y][x - 1].look && selected.look) {
            if (elementNotEmpty(selected.look[3]) && elementNotEmpty(board[y][x - 1].look[1]) && selected.look[3] === board[y][x - 1].look[1]) {
              EnableToPlace[y][x] = "enable";
            }
          }
        }
      }
    }


    setEnabledCells(EnableToPlace);
  };

  const elementNotEmpty = (elem) => {
    if (elem !== null) {
      return true;
    } else {
      return false;
    }
  }

  const elementNotWall = elem => {
    if (elem.name !== "wa") {
      return true;
    } else {
      return false;
    }
  }

  const matchingTopAndBottom = (currentE, otherE) => {
    if (currentE.look[0] === otherE.look[2]) {
      return true;
    } else {
      return false;
    }
  }

  const matchingBottomAndTop = (currentE, otherE) => {
    if (elementNotEmpty(otherE) && elementNotWall(otherE)) {
      if (currentE.look[2] === otherE.look[0]) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  const changingAllTheExistedPathToTheSame = (array, changeThis, changeToThat) => {
    for (let x = 0; x < array.length; x++) {
      for (let y = 0; y < array[x].length; y++) {
        if (array[x][y] === changeThis) {
          array[x][y] = changeToThat;
        }
      }
    }

    return array;
  }

  const calculateExits = (board) => {
    let calculationBoard = [];
    let exits = 1;

    for (let i = 0; i < board.length; i++) {
      let row = [];

      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] !== null && (board[i][j].name === "ro" || board[i][j].name === "ra")) {
          row.push(exits);
          exits++;
        } else {
          row.push(null);
        }
      }
      calculationBoard.push(row);
    }

    for (let i = 0; i < board.length - 1; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (elementNotEmpty(board[i][j]) && elementNotWall(board[i][j])) {
          if (matchingBottomAndTop(board[i][j], board[i + 1][j])) {
            if (elementNotEmpty(calculationBoard[i + 1][j]) && calculationBoard[i + 1][j] < calculationBoard[i][j]) {
              calculationBoard = changingAllTheExistedPathToTheSame(calculationBoard, calculationBoard[i][j], calculationBoard[i + 1][j]);
            } else {
              calculationBoard[i + 1][j] = calculationBoard[i][j];
            }
          } // bottom <-> top validator
        } // board x y validator
      }
    }

    // for (let i = 1; i < board.length - 1; i++) {
    //   for (let j = 1; j < board[i].length - 1; j++) {
    //     // check for matchin top
    //     if (board[i][j] != null) {
    //       let myTop = board[i][j].look[(3 - board[i][j].rotated % 4)];
    //       if (board[i][j].look[0] == board[i - 1][j].look[2]) {
    //         // checks for a calculated value above
    //         if (calculationBoard[i - 1][j] != null){
    //           calculationBoard[i][j] = calculationBoard[i - 1][j] + 1;
    //         } else{
    //           calculationBoard[i][j] = 1;
    //         }
    //       }
    //     }
    //   }
    // }


    console.log(calculationBoard);
  }

  const handlerCalculate = (board) => {
    console.log(board);
    calculateExits(board);
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
                      selectable={
                        enabledCells !== "" ? enabledCells[y][x] : null
                      }
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
