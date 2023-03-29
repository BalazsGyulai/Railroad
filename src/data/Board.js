import { createContext, useState, useEffect, useContext } from "react";
import Moving from "./Moving";
import LoginMange from "./Login";

const BOARD = [
  [
    {
      name: "wa",
      look: ["wa", "wa", "wa", "wa"],
      rotated: 0,
      flip: 1,
      round: 0,
    },
    {
      name: "wa",
      look: ["wa", "wa", "wa", "wa"],
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "ro",
      look: ["u", null, "u", null],
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "wa",
      look: ["wa", "wa", "wa", "wa"],
      rotated: 0,
      flip: 1,
      round: 0,
    },
    {
      name: "ra",
      look: ["s", null, "s", null],
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "wa",
      look: ["wa", "wa", "wa", "wa"],
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "ro",
      look: ["u", null, "u", null],
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "wa",
      look: ["wa", "wa", "wa", "wa"],
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "wa",
      look: ["wa", "wa", "wa", "wa"],
      rotated: 0,
      flip: 1,
      round: 0,
    },
  ], // 1
  [
    {
      name: "wa",
      look: ["wa", "wa", "wa", "wa"],
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
      look: ["wa", "wa", "wa", "wa"],
      rotated: 0,
      flip: 0,
      round: 0,
    },
  ], // 2
  [
    {
      name: "ra",
      look: ["s", null, "s", null],
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
      look: ["s", null, "s", null],
      rotated: 1,
      flip: 0,
      round: 0,
    },
  ], // 3
  [
    {
      name: "wa",
      look: ["wa", "wa", "wa", "wa"],
      rotated: 0,
      flip: 1,
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
      look: ["wa", "wa", "wa", "wa"],
      rotated: 0,
      flip: 1,
      round: 0,
    },
  ], // 4
  [
    {
      name: "ro",
      look: ["u", null, "u", null],
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
      look: ["u", null, "u", null],
      rotated: 1,
      flip: 0,
      round: 0,
    },
  ], // 5
  [
    {
      name: "wa",
      look: ["wa", "wa", "wa", "wa"],
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
      look: ["wa", "wa", "wa", "wa"],
      rotated: 0,
      flip: 0,
      round: 0,
    },
  ], // 6
  [
    {
      name: "ra",
      look: ["s", null, "s", null],
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
      look: ["s", null, "s", null],
      rotated: 1,
      flip: 0,
      round: 0,
    },
  ], // 7
  [
    {
      name: "wa",
      look: ["wa", "wa", "wa", "wa"],
      rotated: 0,
      flip: 1,
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
      look: ["wa", "wa", "wa", "wa"],
      rotated: 0,
      flip: 1,
      round: 0,
    },
  ], // 8
  [
    {
      name: "wa",
      look: ["wa", "wa", "wa", "wa"],
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "wa",
      look: ["wa", "wa", "wa", "wa"],
      rotated: 0,
      flip: 1,
      round: 0,
    },
    {
      name: "ro",
      look: ["u", null, "u", null],
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "wa",
      look: ["wa", "wa", "wa", "wa"],
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "ra",
      look: ["s", null, "s", null],
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "wa",
      look: ["wa", "wa", "wa", "wa"],
      rotated: 0,
      flip: 1,
      round: 0,
    },
    {
      name: "ro",
      look: ["u", null, "u", null],
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "wa",
      look: ["wa", "wa", "wa", "wa"],
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "wa",
      look: ["wa", "wa", "wa", "wa"],
      rotated: 0,
      flip: 0,
      round: 0,
    },
  ], // 9
];

const BoardTable = createContext();

export function BoardManage({ children }) {
  // ---------- other context variables --------
  const {
    selected,
    cellItemSelected,
    action,
    SetSelected,
    upgradeAction,
    deleteItem,
    deleteHandler,
    placedAllItem,
    saveAction,
  } = useContext(Moving);
  const { loggedIn, mode, baseURL } = useContext(LoginMange);
  // --------- local global variables -----------
  const [board, setBoard] = useState(BOARD);
  const [windowSize, setWindowSize] = useState({
    x: 0,
    y: 0,
  });
  const [cellSize, setCellSize] = useState(65);

  // --------------------------------------------
  // This is for creating a new Board / a new Item
  // --------------------------------------------
  function newItem(item) {
    return item;
  }

  useEffect(() => {
    if (deleteItem) {
      let newBoard = board;
      newBoard[cellItemSelected.y][cellItemSelected.x] = null;

      setBoard(new newItem(newBoard));

      SetSelected("");
      upgradeAction();
      deleteHandler(false);
    } else {
      if (cellItemSelected !== "") {
        dropToCellHandler(cellItemSelected.x, cellItemSelected.y);
      }
    }
  }, [action]);

  useEffect(() => {
    saveBoard(board);
  }, [saveAction]);

  // -------------------------------------------
  // handles the window size when it changes
  // -------------------------------------------

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  const getBoard = async () => {
    if (loggedIn && mode === "multiPlayer") {
      await fetch(`${baseURL}getBoard.php`, {
        method: "post",
        body: JSON.stringify({
          id: JSON.parse(sessionStorage.getItem("user")).id,
        }),
      })
        .then((data) => data.json())
        .then((data) => {
          if (data.status === "ok") {
            if (JSON.parse(data.board.userBoard) !== null) {
              setBoard(JSON.parse(data.board.userBoard));
            } else {
              fetch(`${baseURL}saveBoard.php`, {
                method: "post",
                body: JSON.stringify({
                  id: JSON.parse(sessionStorage.getItem("user")).id,
                  board: [...BOARD],
                }),
              })
                .then((data) => data.json())
                .then((data) => {
                  setBoard([...BOARD]);
                });
            }
          } else if (data.status === "failed to connect") {
            console.log("failed to connect");
          } else {
            console.log("something is wrong");
          }
        });
    }
  };

  useEffect(() => {
    handleWindowResize();
    getBoard();
  }, []);

  const handleWindowResize = () => {
    setWindowSize({
      x: window.innerWidth,
      y: window.innerHeight,
    });

    let x = window.innerWidth;
    let y = window.innerHeight;

    if (x < 769) {
      if (y - (cellSize + 10) * 4 - 5 < x) {
        setCellSize((y - (cellSize + 10) * 4 - 5) / 9);
      } else {
        setCellSize(x / 9);
      }
    } else {
      if (x / 2 < y) {
        if (x / 2 / 9 > 65) {
          setCellSize(65);
        } else {
          setCellSize(x / 2 / 9);
          // setCellSize((y - (cellSize + 10)) / 9);
        }
      } else {
        if (y / 9 > 65) {
          setCellSize(65);
        } else {
          setCellSize((y - (cellSize + 10)) / 9);
        }
      }
    }
  };

  // -------------------------------------
  // Sets the selected item to the board
  // -------------------------------------

  const dropPieceHandler = (x, y) => {
    let found = false;
    if (selected.name[0] === "S") {
      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
          if (board[i][j] !== null && board[i][j].name === selected.name) {
            found = true;
          }
        }
      }
    }

    if (!found) {
      let newBoard = board;

      newBoard[y][x] = selected;

      setBoard([...board], (board[y][x] = { ...selected }));
      saveBoard(newBoard);
    }
  };

  const dropToCellHandler = (x, y) => {
    if (selected !== "" && selected !== null) {
      if (!placedAllItem) {
        dropPieceHandler(x, y);
      } else if (selected.name[0] === "S") {
        dropPieceHandler(x, y);
      }
    }
  };

  const saveBoard = async (save) => {
    if (loggedIn && mode === "multiPlayer") {
      if (save !== BOARD) {
        await fetch(`${baseURL}saveBoard.php`, {
          method: "post",
          body: JSON.stringify({
            id: JSON.parse(sessionStorage.getItem("user")).id,
            board: save,
          }),
        })
      }
    }
  };

  return (
    <BoardTable.Provider
      value={{
        board,
        dropToCellHandler,
        cellSize,
        windowSize,
        newItem,
        getBoard,
        saveBoard,
      }}
    >
      {children}
    </BoardTable.Provider>
  );
}

export default BoardTable;
