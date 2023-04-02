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
    // findLongestRoad();
  }, [board, action, round]);

  function NewItem(val) {
    return val;
  }

  const findLongestRoad = async () => {
    let CountRoads = [];

    for (let y = 0; y < board.length; y++) {
      let row = [];
      for (let x = 0; x < board[y].length; x++) {
        row.push(null);
      }

      CountRoads.push(row);
    }

    for (let y = 0; y < board.length; y++) {
      for (let x = 0; x < board[y].length; x++) {
        if (board[y][x] !== null) {
          let count =
            y === 0 || y === 8 || x === 0 || x === 8
              ? 0
              : 0;

          let i = 0;

          while (i < board[y][x].look.length && board[y][x].look[i] !== "u") {
            i++;
          }

          if (i < board[y][x].look.length) {
            if (y === 0 || y === 8 || x === 0 || x === 8) {
              CountRoads[y][x] = count;

              let found = {top: false, right: false, bottom: false, left: false};
              let z = 0;
              count = getCount(x, y, CountRoads) + 1;

              let k = y;
              let l = x;

              while ((found.top === true || found.right === true || found.bottom === true || found.left === true || count === 1)&& z < 10) {
                z += 1;
                found.top = false;
                found.right = false;
                found.bottom = false;
                found.left = false;

                // top <-> bottom
                // if (
                //   itemSides(x, y).top === sidePiecesSides(x, y).top &&
                //   sidePiecesSides(x, y).top !== "wa" &&
                //   itemSides(x, y).top !== null &&
                //   itemSides(x, y).top === "u" &&
                //   sidePiecesSides(x, y).top === "u"
                // ) {
                //   CountRoads[y][x] = count;
                // }
                // right <-> left
                if (
                  itemSides(l, k).right === sidePiecesSides(l, k).right &&
                  sidePiecesSides(l, k).right !== "wa" &&
                  itemSides(l, k).right !== null &&
                  itemSides(l, k).right === "u" &&
                  sidePiecesSides(l, k).right === "u"
                ) {
                  if (l + 1 < CountRoads[k].length){
                    CountRoads[k][l + 1] = count;
                    found.left = true;
                  }
                }
                // bottom <-> top
                if (
                  itemSides(l, k).bottom === sidePiecesSides(l, k).bottom &&
                  sidePiecesSides(l, k).bottom !== "wa" &&
                  itemSides(l, k).bottom !== null &&
                  itemSides(l, k).bottom === "u" &&
                  sidePiecesSides(l, k).bottom === "u"
                ) {
                  if (k + 1 < CountRoads.length) {
                    CountRoads[k + 1][l] = count;
                    found.bottom = true;
                  }
                  // console.log(getCount(x, y, CountRoads));
                }
                // left <-> right
                if (
                  itemSides(l, k).left === sidePiecesSides(l, k).left &&
                  sidePiecesSides(l, k).left !== "wa" &&
                  itemSides(l, k).left !== null &&
                  itemSides(l, k).left === "u" &&
                  sidePiecesSides(l, k).left === "u"
                ) {
                  if (l - 1 > 0) {
                    CountRoads[k][l - 1] = count;
                    found.left = true;
                  }
                }

                l = found.left ? l - 1 : found.right ? l + 1 : l;
                k = found.top ? k - 1 : found.bottom ? k + 1 : k;
              }
            } else {
              // // top <-> bottom
              // if (
              //   itemSides(x, y).top === sidePiecesSides(x, y).top &&
              //   sidePiecesSides(x, y).top !== "wa" &&
              //   itemSides(x, y).top !== null &&
              //   itemSides(x, y).top === "u" &&
              //   sidePiecesSides(x, y).top === "u"
              // ) {
              //   CountRoads[y][x] = count;
              // }
              // // right <-> left
              // if (
              //   itemSides(x, y).right === sidePiecesSides(x, y).right &&
              //   sidePiecesSides(x, y).right !== "wa" &&
              //   itemSides(x, y).right !== null &&
              //   itemSides(x, y).right === "u" &&
              //   sidePiecesSides(x, y).right === "u"
              // ) {
              //   CountRoads[y][x] = count;
              // }
              // // bottom <-> top
              // if (
              //   itemSides(x, y).bottom === sidePiecesSides(x, y).bottom &&
              //   sidePiecesSides(x, y).bottom !== "wa" &&
              //   itemSides(x, y).bottom !== null &&
              //   itemSides(x, y).bottom === "u" &&
              //   sidePiecesSides(x, y).bottom === "u"
              // ) {
              //   CountRoads[y][x] = count;
              //   // console.log(getCount(x, y, CountRoads));
              // }
              // // left <-> right
              // if (
              //   itemSides(x, y).left === sidePiecesSides(x, y).left &&
              //   sidePiecesSides(x, y).left !== "wa" &&
              //   itemSides(x, y).left !== null &&
              //   itemSides(x, y).left === "u" &&
              //   sidePiecesSides(x, y).left === "u"
              //   ) {
              //   CountRoads[y][x] = count;
              // }
            }
          }

          // console.log(`${y} ${x}`, itemSides(x, y), sidePiecesSides(x, y));
        }
      }
    }

    let max = 0;

    for (let y = 0; y < CountRoads.length; y++) {
      for (let x = 0; x < CountRoads[y].length; x++) {
        if (CountRoads[y][x] !== null && CountRoads[y][x] > max) {
          max = CountRoads[y][x];
        }
      }
    }

    console.log(CountRoads);
    console.log(max);
  };

  const getCount = (x, y, array) => {
    let Counts = [
      y - 1 >= 0 && array[y - 1][x] !== null ? array[y - 1][x] : null,

      x + 1 < array[y].length && array[y][x + 1] !== null
        ? array[y][x + 1]
        : null,

      y + 1 < array.length && array[y + 1][x] !== null ? array[y + 1][x] : null,

      x - 1 >= 0 && array[y][x - 1] !== null ? array[y][x - 1] : null,
    ];

    let max = 0;

    for (let i = 0; i < Counts.length; i++) {
      if (Counts[i] !== null && Counts[i] > max) {
        max = Counts[i];
      }
    }

    return max;
  };

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
    for (let y = 1; y < board.length - 1; y++) {
      for (let x = 1; x < board[y].length - 1; x++) {
        if (board[y][x] !== null) {
          // top <-> bottom
          if (
            itemSides(x, y).top !== sidePiecesSides(x, y).top &&
            sidePiecesSides(x, y).top !== "wa" &&
            itemSides(x, y).top !== null
          ) {
            count += 1;
          }

          // right <-> left
          if (
            itemSides(x, y).right !== sidePiecesSides(x, y).right &&
            sidePiecesSides(x, y).right !== "wa" &&
            itemSides(x, y).right !== null
          ) {
            count += 1;
          }

          // bottom <-> top
          if (
            itemSides(x, y).bottom !== sidePiecesSides(x, y).bottom &&
            sidePiecesSides(x, y).bottom !== "wa" &&
            itemSides(x, y).bottom !== null
          ) {
            count += 1;
          }

          // left <-> right
          if (
            itemSides(x, y).left !== sidePiecesSides(x, y).left &&
            sidePiecesSides(x, y).left !== "wa" &&
            itemSides(x, y).left !== null
          ) {
            count += 1;
          }
        }
      }
    }

    setnotConnects(count * -1);
  };

  const itemSides = (x, y) => {
    let Placed = {
      top: board[y][x].look[
        ((board[y][x].rotated % 2 === 1 && board[y][x].flip === -1 ? 2 : 0) +
          ((4 - board[y][x].rotated) % 4)) %
          4
      ],
      right:
        board[y][x].look[
          ((board[y][x].rotated % 2 === 0 && board[y][x].flip === -1 ? 3 : 1) +
            ((4 - board[y][x].rotated) % 4)) %
            4
        ],
      bottom:
        board[y][x].look[
          ((board[y][x].rotated % 2 === 1 && board[y][x].flip === -1 ? 0 : 2) +
            ((4 - board[y][x].rotated) % 4)) %
            4
        ],
      left: board[y][x].look[
        ((board[y][x].rotated % 2 === 0 && board[y][x].flip === -1 ? 1 : 3) +
          ((4 - board[y][x].rotated) % 4)) %
          4
      ],
    };

    return Placed;
  };

  const sidePiecesSides = (x, y) => {
    let Placed = {
      top:
        y - 1 >= 0 && board[y - 1][x] !== null
          ? board[y - 1][x].look[
              ((board[y - 1][x].rotated % 2 === 1 && board[y - 1][x].flip === -1
                ? 0
                : 2) +
                ((4 - board[y - 1][x].rotated) % 4)) %
                4
            ]
          : null,
      right:
        x + 1 < board[y].length && board[y][x + 1] !== null
          ? board[y][x + 1].look[
              ((board[y][x + 1].rotated % 2 === 0 && board[y][x + 1].flip === -1
                ? 1
                : 3) +
                ((4 - board[y][x + 1].rotated) % 4)) %
                4
            ]
          : null,
      bottom:
        y + 1 < board.length && board[y + 1][x] !== null
          ? board[y + 1][x].look[
              ((board[y + 1][x].rotated % 2 === 1 && board[y + 1][x].flip === -1
                ? 2
                : 0) +
                ((4 - board[y + 1][x].rotated) % 4)) %
                4
            ]
          : null,
      left:
        x - 1 >= 0 && board[y][x - 1] !== null
          ? board[y][x - 1].look[
              ((board[y][x - 1].rotated % 2 === 0 && board[y][x - 1].flip === -1
                ? 3
                : 1) +
                ((4 - board[y][x - 1].rotated) % 4)) %
                4
            ]
          : null,
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
