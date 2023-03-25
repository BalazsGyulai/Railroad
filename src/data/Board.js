import { createContext, useState, useEffect, useContext } from "react";
import Moving from "./Moving";
import Road from "../Rails/Road";
import Trail from "../Rails/Trail";
import WA from "../Icons/WA"

const BOARD = [
  [
    {
      name: "wa",
      look: ["wa", "wa", "wa", "wa"],
      item: <WA />,
      rotated: 0,
      flip: 1,
      round: 0,
    },
    {
      name: "wa",
      look: ["wa", "wa", "wa", "wa"],
      item: <WA />,
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "ro",
      look: ["u", null, "u", null],
      item: <Road />,
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "wa",
      look: ["wa", "wa", "wa", "wa"],
      item: <WA />,
      rotated: 0,
      flip: 1,
      round: 0,
    },
    {
      name: "ra",
      look: ["s", null, "s", null],
      item: <Trail />,
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "wa",
      look: ["wa", "wa", "wa", "wa"],
      item: <WA />,
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "ro",
      look: ["u", null, "u", null],
      item: <Road />,
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "wa",
      look: ["wa", "wa", "wa", "wa"],
      item: <WA />,
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "wa",
      look: ["wa", "wa", "wa", "wa"],
      item: <WA />,
      rotated: 0,
      flip: 1,
      round: 0,
    },
  ], // 1
  [
    {
      name: "wa",
      look: ["wa", "wa", "wa", "wa"],
      item: <WA />,
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
      item: <WA />,
      rotated: 0,
      flip: 0,
      round: 0,
    },
  ], // 2
  [
    {
      name: "ra",
      look: ["s", null, "s", null],
      item: <Trail />,
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
      item: <Trail />,
      rotated: 1,
      flip: 0,
      round: 0,
    },
  ], // 3
  [
    {
      name: "wa",
      look: ["wa", "wa", "wa", "wa"],
      item: <WA />,
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
      item: <WA />,
      rotated: 0,
      flip: 1,
      round: 0,
    },
  ], // 4
  [
    {
      name: "ro",
      look: ["u", null, "u", null],
      item: <Road />,
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
      item: <Road />,
      rotated: 1,
      flip: 0,
      round: 0,
    },
  ], // 5
  [
    {
      name: "wa",
      look: ["wa", "wa", "wa", "wa"],
      item: <WA />,
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
      item: <WA />,
      rotated: 0,
      flip: 0,
      round: 0,
    },
  ], // 6
  [
    {
      name: "ra",
      look: ["s", null, "s", null],
      item: <Trail />,
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
      item: <Trail />,
      rotated: 1,
      flip: 0,
      round: 0,
    },
  ], // 7
  [
    {
      name: "wa",
      look: ["wa", "wa", "wa", "wa"],
      item: <WA />,
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
      item: <WA />,
      rotated: 0,
      flip: 1,
      round: 0,
    },
  ], // 8
  [
    {
      name: "wa",
      look: ["wa", "wa", "wa", "wa"],
      item: <WA />,
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "wa",
      look: ["wa", "wa", "wa", "wa"],
      item: <WA />,
      rotated: 0,
      flip: 1,
      round: 0,
    },
    {
      name: "ro",
      look: ["u", null, "u", null],
      item: <Road />,
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "wa",
      look: ["wa", "wa", "wa", "wa"],
      item: <WA />,
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "ra",
      look: ["s", null, "s", null],
      item: <Trail />,
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "wa",
      look: ["wa", "wa", "wa", "wa"],
      item: <WA />,
      rotated: 0,
      flip: 1,
      round: 0,
    },
    {
      name: "ro",
      look: ["u", null, "u", null],
      item: <Road />,
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "wa",
      look: ["wa", "wa", "wa", "wa"],
      item: <WA />,
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "wa",
      look: ["wa", "wa", "wa", "wa"],
      item: <WA />,
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
  } = useContext(Moving);


  // --------- local global variables -----------
  const [board, setBoard] = useState(BOARD);
  const [windowSize, setWindowSize] = useState({
    x: 0,
    y: 0,
  })
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

  // -------------------------------------------
  // handles the window size when it changes
  // -------------------------------------------

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  useEffect(() => {
    handleWindowResize();

  }, [])

  const handleWindowResize = () => {
    setWindowSize({
      x: window.innerWidth,
      y: window.innerHeight
    });

    let x = window.innerWidth;
    let y = window.innerHeight;

    if (x < 769) {
      if ((y - (cellSize + 10) * 4 - 5) < x) {
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

  const dropToCellHandler = (x, y) => {
    if (selected !== "" && selected !== null) {
      let newBoard = board;
      newBoard[y][x] = selected;

      setBoard([...board], (board[y][x] = { ...selected }));
    }
  };

  return (
    <BoardTable.Provider
      value={{
        board,
        dropToCellHandler,
        cellSize,
        windowSize,
        newItem
      }}
    >
      {children}
    </BoardTable.Provider>
  );
}

export default BoardTable;
