import React, { useState, useContext, useEffect } from "react";
import Cell from "./Cell";
import "./Board.css";
import BoardTable from "../data/Board";
import Moving from "../data/Moving";
import CountTable from "./CountTable";

const Board = ({ custumBoard }) => {
  const { board, windowSize, cellSize, getBoard, saveBoard } =
    useContext(BoardTable);
  const { selected, action, cellItemSelected } = useContext(Moving);

  const [enabledCells, setEnabledCells] = useState("");
  const [renderBoard, setRenderBoard] = useState("");

  useEffect(() => {
    getBoard();
    RenderBoardHandler();
  }, []);

  useEffect(() => {
    saveBoard(board);
  }, [action]);
  
  useEffect(() => {
    RenderBoardHandler();
    handleEmptyCells(board);
  }, [selected, action, board, cellItemSelected, custumBoard]);

  const RenderBoardHandler = () => {
    if (custumBoard !== null && custumBoard !== undefined) {
      setRenderBoard(custumBoard);
    } else {
      setRenderBoard(board);
    }
  }

  const handleEmptyCells = async (board) => {
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
      for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
          if (board[y][x] !== null && board[y][x].look && selected.look) {
            let Placed = {
              top: board[y][x].look[
                ((board[y][x].rotated % 2 === 1 && board[y][x].flip === -1
                  ? 2
                  : 0) +
                  ((4 - board[y][x].rotated) % 4)) %
                  4
              ],
              right:
                board[y][x].look[
                  ((board[y][x].rotated % 2 === 0 && board[y][x].flip === -1
                    ? 3
                    : 1) +
                    ((4 - board[y][x].rotated) % 4)) %
                    4
                ],
              bottom:
                board[y][x].look[
                  ((board[y][x].rotated % 2 === 1 && board[y][x].flip === -1
                    ? 0
                    : 2) +
                    ((4 - board[y][x].rotated) % 4)) %
                    4
                ],
              left: board[y][x].look[
                ((board[y][x].rotated % 2 === 0 && board[y][x].flip === -1
                  ? 1
                  : 3) +
                  ((4 - board[y][x].rotated) % 4)) %
                  4
              ],
            };

            let Selected = {
              top: selected.look[
                ((selected.rotated % 2 === 1 && selected.flip === -1 ? 2 : 0) +
                  ((4 - selected.rotated) % 4)) %
                  4
              ],
              right:
                selected.look[
                  ((selected.rotated % 2 === 0 && selected.flip === -1
                    ? 3
                    : 1) +
                    ((4 - selected.rotated) % 4)) %
                    4
                ],
              bottom:
                selected.look[
                  ((selected.rotated % 2 === 1 && selected.flip === -1
                    ? 0
                    : 2) +
                    ((4 - selected.rotated) % 4)) %
                    4
                ],
              left: selected.look[
                ((selected.rotated % 2 === 0 && selected.flip === -1 ? 1 : 3) +
                  ((4 - selected.rotated) % 4)) %
                  4
              ],
            };

            // top <-> bottom
            if (y - 1 > 0) {
              if (
                Placed.top === Selected.bottom &&
                Placed.top !== null &&
                Selected.bottom !== null
              ) {
                EnableToPlace[y - 1][x] = "enable";
              }
            }

            if (y + 1 < board.length) {
              if (
                Placed.bottom === Selected.top &&
                Placed.bottom !== null &&
                Selected.top !== null
              ) {
                EnableToPlace[y + 1][x] = "enable";
              }
            }

            // left <-> right
            if (x - 1 > 0) {
              if (
                Placed.left === Selected.right &&
                Placed.left !== null &&
                Selected.right !== null
              ) {
                EnableToPlace[y][x - 1] = "enable";
              }
            }

            if (x + 1 < board[y].length) {
              if (
                Placed.right === Selected.left &&
                Placed.right !== null &&
                Selected.left !== null
              ) {
                EnableToPlace[y][x + 1] = "enable";
              }
            }
          }
        }
      }

      // unable if you cant place it
      for (let y = 0; y < EnableToPlace.length; y++) {
        // for (let y = 4; y < 5; y++) {
        for (let x = 0; x < EnableToPlace[y].length; x++) {
          if (EnableToPlace[y][x] !== null && selected.look) {
            let Selected = {
              top: selected.look[
                ((selected.rotated % 2 === 1 && selected.flip === -1 ? 2 : 0) +
                  ((4 - selected.rotated) % 4)) %
                  4
              ],
              right:
                selected.look[
                  ((selected.rotated % 2 === 0 && selected.flip === -1
                    ? 3
                    : 1) +
                    ((4 - selected.rotated) % 4)) %
                    4
                ],
              bottom:
                selected.look[
                  ((selected.rotated % 2 === 1 && selected.flip === -1
                    ? 0
                    : 2) +
                    ((4 - selected.rotated) % 4)) %
                    4
                ],
              left: selected.look[
                ((selected.rotated % 2 === 0 && selected.flip === -1 ? 1 : 3) +
                  ((4 - selected.rotated) % 4)) %
                  4
              ],
            };

            // top <-> bottom
            if (y - 1 > 0) {
              if (board[y - 1][x] !== null && board[y - 1][x].look) {
                let AbovePlaced = {
                  bottom:
                    board[y - 1][x].look[
                      ((board[y - 1][x].rotated % 2 === 1 &&
                      board[y - 1][x].flip === -1
                        ? 0
                        : 2) +
                        ((4 - board[y - 1][x].rotated) % 4)) %
                        4
                    ],
                };

                if (Selected.top !== AbovePlaced.bottom) {
                  if (
                    Selected.top !== null &&
                    AbovePlaced.bottom !== null &&
                    AbovePlaced.bottom !== "wa"
                  ) {
                    EnableToPlace[y][x] = null;
                  }
                }
              }
            }

            // right <-> left

            if (x + 1 < EnableToPlace[y].length) {
              if (board[y][x + 1] !== null && board[y][x + 1].look) {
                let LeftSide = {
                  left: board[y][x + 1].look[
                    ((board[y][x + 1].rotated % 2 === 0 &&
                    board[y][x + 1].flip === -1
                      ? 1
                      : 3) +
                      ((4 - board[y][x + 1].rotated) % 4)) %
                      4
                  ],
                };

                if (Selected.right !== LeftSide.left) {
                  if (
                    Selected.right !== null &&
                    LeftSide.left !== null &&
                    LeftSide.left !== "wa"
                  ) {
                    EnableToPlace[y][x] = null;
                  }
                }
              }
            }

            // bottom <-> top
            if (y + 1 < EnableToPlace.length) {
              if (board[y + 1][x] !== null && board[y + 1][x].look) {
                let UnderPlace = {
                  top: board[y + 1][x].look[
                    ((board[y + 1][x].rotated % 2 === 1 &&
                    board[y + 1][x].flip === -1
                      ? 2
                      : 0) +
                      ((4 - board[y + 1][x].rotated) % 4)) %
                      4
                  ],
                };

                if (Selected.bottom !== UnderPlace.top) {
                  if (
                    Selected.bottom !== null &&
                    UnderPlace.top !== null &&
                    UnderPlace.top !== "wa"
                  ) {
                    EnableToPlace[y][x] = null;
                  }
                }
              }
            }

            // left <-> right
            if (x - 1 > 0) {
              if (board[y][x - 1] !== null && board[y][x - 1].look) {
                let RightSide = {
                  right:
                    board[y][x - 1].look[
                      ((board[y][x - 1].rotated % 2 === 0 &&
                      board[y][x - 1].flip === -1
                        ? 3
                        : 1) +
                        ((4 - board[y][x - 1].rotated) % 4)) %
                        4
                    ],
                };

                if (Selected.left !== RightSide.right) {
                  if (
                    Selected.left !== null &&
                    RightSide.right !== null &&
                    RightSide.right !== "wa"
                  ) {
                    EnableToPlace[y][x] = null;
                  }
                }
              }
            }
          }
        }
      }
    }

    setEnabledCells(EnableToPlace);
  };


  return (
    <div id="boardHolder">
      <CountTable custumBoard={renderBoard} />

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
          {renderBoard !== ""
            ? renderBoard.map((row, y) => (
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
              ))
            : ""}
        </div>
      </div>
    </div>
  );
};

export default Board;
