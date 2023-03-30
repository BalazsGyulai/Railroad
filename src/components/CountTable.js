import React, { useContext, useState, useEffect } from "react";
import BoardTable from "../data/Board";
import Moving from "../data/Moving";
import NextArrow from "../Icons/NextArrow";
import Center from "../Icons/Center";
import NotConnected from "../Icons/NotConnected";
import "./CountTable.css";

const CountTable = () => {
  const { board, cellSize } = useContext(BoardTable);
  const { NextRoundHandler, round, action } = useContext(Moving);
  const [centerVal, setCenterVal] = useState(0);
  const [notConnects, setnotConnects] = useState(0);

  useEffect(() => {
    callculateCenter();
    callculateNotConnected();
  }, [board, action, round]);

  const callculateCenter = async () => {
    let count = 0;
    for (let y = 3; y < 6; y++) {
      for (let x = 3; x < 6; x++) {
        if (board[y][x] !== null) {
          count += 1;
        }
      }
    }
    setCenterVal(count);
  };

  const callculateNotConnected = async () => {
    let count = 0;
    for (let y = 1; y < (board.length - 1); y++) {
      for (let x = 1; x < (board[y].length - 1); x++) {
        if (board[y][x] !== null) {
            // top <-> bottom
            if (itemSides(x, y).top !== sidePiecesSides(x, y).top && sidePiecesSides(x, y).top !== "wa" && itemSides(x, y).top !== null){
                count += 1;
            }

            // right <-> left
            if (itemSides(x, y).right !== sidePiecesSides(x, y).right && sidePiecesSides(x, y).right !== "wa" && itemSides(x, y).right !== null){
                count += 1;
            }

            // bottom <-> top
            if (itemSides(x, y).bottom !== sidePiecesSides(x, y).bottom && sidePiecesSides(x, y).bottom !== "wa" && itemSides(x, y).bottom !== null){
                count += 1;
            }

            // left <-> right
            if (itemSides(x, y).left !== sidePiecesSides(x, y).left && sidePiecesSides(x, y).left !== "wa" && itemSides(x, y).left !== null){
                count += 1;
            }

          console.log(sidePiecesSides(x, y), itemSides(x, y));
        }
      }
    }

    setnotConnects(count * -1);
  };

  const itemSides = (x, y) => {
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

      return Placed;
  }

  const sidePiecesSides = (x, y) => {
    let Placed = {
        top: board[y - 1][x] !== null ?  board[y - 1][x].look[
          ((board[y - 1][x].rotated % 2 === 1 && board[y - 1][x].flip === -1
            ? 0
            : 2) +
            ((4 - board[y - 1][x].rotated) % 4)) %
            4
        ] : null,
        right: board[y][x + 1] !== null ?
          board[y][x + 1].look[
            ((board[y][x + 1].rotated % 2 === 0 && board[y][x + 1].flip === -1
              ? 1
              : 3) +
              ((4 - board[y][x + 1].rotated) % 4)) %
              4
          ] : null,
        bottom:
        board[y + 1][x] !== null ?
          board[y + 1][x].look[
            ((board[y + 1][x].rotated % 2 === 1 && board[y + 1][x].flip === -1
              ? 2
              : 0) +
              ((4 - board[y + 1][x].rotated) % 4)) %
              4
          ] : null,
        left: board[y][x - 1] !== null ? board[y][x - 1].look[
          ((board[y][x - 1].rotated % 2 === 0 && board[y][x - 1].flip === -1
            ? 3
            : 1) +
            ((4 - board[y][x - 1].rotated) % 4)) %
            4
        ] : null,
      };

    return Placed;
  };

  return (
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
        {sessionStorage.getItem("user") &&
        JSON.parse(sessionStorage.getItem("user")).rank === "admin" ? (
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
        ) : (
          ""
        )}
      </div>

      <div className="CountTable">
        <div
          className="CountItem"
          style={{
            width: `${cellSize * 0.7 * 2}px`,
            height: `${cellSize * 0.7 - 10}px`,
          }}
        >
          <div
            className="CountIcon"
            style={{
              width: `${cellSize * 0.7}px`,
              height: `${cellSize * 0.7 - 10}px`,
            }}
          >
            <Center />
          </div>
          <div
            className="CountValue"
            style={{
              width: `${cellSize * 0.7}px`,
              height: `${cellSize * 0.7 - 10}px`,
            }}
          >
            {centerVal}
          </div>
        </div>

        <div
          className="CountItem"
          style={{
            width: `${cellSize * 0.7 * 2}px`,
            height: `${cellSize * 0.7 - 10}px`,
          }}
        >
          <div
            className="CountIcon"
            style={{
              width: `${cellSize * 0.7}px`,
              height: `${cellSize * 0.7 - 10}px`,
            }}
          >
            <NotConnected />
          </div>
          <div
            className="CountValue"
            style={{
              width: `${cellSize * 0.7}px`,
              height: `${cellSize * 0.7 - 10}px`,
            }}
          >
            {notConnects}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountTable;
