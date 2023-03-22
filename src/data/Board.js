import { createContext, useState, useEffect, useContext } from "react";
import Moving from "./Moving";
import Road from "../Rails/Road";
import Trail from "../Rails/Trail";

const BOARD = [
  [
    {
      name: "wa",
      item: "",
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "wa",
      item: "",
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "ro",
      item: <Road />,
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "wa",
      item: "",
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "ra",
      item: <Trail />,
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "wa",
      item: "",
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "ro",
      item: <Road />,
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "wa",
      item: "",
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "wa",
      item: "",
      rotated: 0,
      flip: 0,
      round: 0,
    },
  ], // 1
  [
    {
      name: "wa",
      item: "",
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
      item: "",
      rotated: 0,
      flip: 0,
      round: 0,
    },
  ], // 2
  [
    {
      name: "ra",
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
      item: <Trail />,
      rotated: 1,
      flip: 0,
      round: 0,
    },
  ], // 3
  [
    {
      name: "wa",
      item: "",
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
      item: "",
      rotated: 0,
      flip: 0,
      round: 0,
    },
  ], // 4
  [
    {
      name: "ro",
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
      item: <Road />,
      rotated: 1,
      flip: 0,
      round: 0,
    },
  ], // 5
  [
    {
      name: "wa",
      item: "",
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
      item: "",
      rotated: 0,
      flip: 0,
      round: 0,
    },
  ], // 6
  [
    {
      name: "ra",
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
      item: <Trail />,
      rotated: 1,
      flip: 0,
      round: 0,
    },
  ], // 7
  [
    {
      name: "wa",
      item: "",
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
      item: "",
      rotated: 0,
      flip: 0,
      round: 0,
    },
  ], // 8
  [
    {
      name: "wa",
      item: "",
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "wa",
      item: "",
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "ro",
      item: <Road />,
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "wa",
      item: "",
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "ra",
      item: <Trail />,
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "wa",
      item: "",
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "ro",
      item: <Road />,
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "wa",
      item: "",
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "wa",
      item: "",
      rotated: 0,
      flip: 0,
      round: 0,
    },
  ], // 9
];

const BoardTable = createContext();

export function BoardManage({ children }) {
  const {
    selected,
    cellItemSelected,
    action,
    SetSelected,
    upgradeAction,
    deleteItem,
    deleteHandler,
  } = useContext(Moving);
  const [board, setBoard] = useState(BOARD);

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
      }}
    >
      {children}
    </BoardTable.Provider>
  );
}

export default BoardTable;
