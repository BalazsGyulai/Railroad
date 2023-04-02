import { createContext, useState, useEffect, useContext } from "react";
import LoginMange from "./Login";

const Moving = createContext();

export function MovingManage({ children }) {
  const { loggedIn, mode, baseURL, SocketupgradePage, PageHandler } =
    useContext(LoginMange);
  const [selected, useSelected] = useState("");
  const [round, setRound] = useState(0);
  const [action, setAction] = useState(false);
  const [deleteItem, setDeleteItem] = useState(false);
  const [cellItemSelected, setCellItemSelected] = useState("");
  const [placedAllItem, setPlacedAllItems] = useState(false);
  const [saveAction, setSaveAction] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const saveUpdate = () => {
    setSaveAction(!saveAction);
  };

  useEffect(() => {
    if (loggedIn === false && mode === "creative") {
      RoundHandler(1);
    } else if (loggedIn && mode === "multiPlayer") {
      // fetch(`${baseURL}page.php`, {
      //   method: "post",
      //   body: JSON.stringify({
      //     code: JSON.parse(sessionStorage.getItem("user")).code,
      //   }),
      // })
      //   .then((data) => data.json())
      //   .then((data) => {
      //     if (data.status === "ok") {
      //       // console.log(data.page.round)
      //       RoundHandler(data.page.round);
      //     } else if (data.status === "failed to connect") {
      //       console.log("failed to connect");
      //     } else {
      //       console.log("something is wrong");
      //     }
      //   });
    }
  }, [mode, loggedIn]);

  const updatePlacedAllItems = (val) => {
    setPlacedAllItems(val);
  };

  // ---------------------------------------
  // This is called by the components if
  // an item was tapped.
  // If the value of the x is empty ("") then
  // it means not a normal/special item was hit
  // ---------------------------------------

  const updateCellItemSelected = (x, y) => {
    changeCellItemSelected({ x: x, y: y });
  };

  // -----------------------------------------
  // This changes the value of the cellItemSelected
  // -----------------------------------------

  const changeCellItemSelected = (val) => {
    setCellItemSelected(val);
  };

  const ChangeSelectedPieceId = (id) => {
    setSelectedId(id);
  };

  // ---------------------------------------
  // This is called when an item is tapped.
  // This compares when to select or unselect a piece
  // ---------------------------------------

  const SetSelected = async (newest, pieceId) => {
    useSelected(AnalyseSelected(newest, pieceId));

    // reset cell item selected
    // if (cellItemSelected !== "") {
    //   changeCellItemSelected(AnalyseSelected(newest));
    // }
  };

  const AnalyseSelected = (newest, pieceId) => {
    if (newest.name === selected.name) {
      ChangeSelectedPieceId(null);
      return "";
    } else {
      ChangeSelectedPieceId(pieceId);
      return newest;
    }
  };

  // ---------------------------------------
  // This is called when the round is changes
  // ---------------------------------------

  const RoundHandler = (val) => {
    setRound(val);
  };

  const NextRoundHandler = async () => {
    if (loggedIn && mode === "multiPlayer") {
      await fetch(`${baseURL}setPage.php`, {
        method: "post",
        body: JSON.stringify({
          code: JSON.parse(sessionStorage.getItem("user")).code,
          page: "join",
        }),
      })
        .then((data) => data.json())
        .then((data) => {
          if (data.status === "failed to connect") {
            console.log("failed to connect");
          } else {
            console.log("something is wrong");
          }
        });

      SocketupgradePage("join");
      PageHandler("join");
    }

    // RoundHandler(round + 1);

    // reset selected
    SetSelected("");

    upgradeAction();
  };

  // -----------------------------------------
  // This handles the Controls component clicks
  // -----------------------------------------
  const RotateHandler = (val) => {
    let turnable = selected;

    turnable.rotated = turnable.rotated + val;

    if (turnable.rotated < 0) {
      turnable.rotated = 3;
    } else if (turnable.rotated > 3) {
      turnable.rotated = 0;
    }

    upgradeAction();
    saveUpdate();
  };

  const FlipHandler = () => {
    let flipable = selected;

    if (flipable.flip === 0) {
      flipable.flip = -1;
    } else {
      flipable.flip = 0;
    }

    upgradeAction();
    saveUpdate();
  };

  const deleteHandler = (val) => {
    setDeleteItem(val);

    upgradeAction();
  };

  // -------------------------------------
  // When a control's item was hit this change.
  // If this change then the page's items will refresh
  // -------------------------------------

  const upgradeAction = () => {
    setAction(!action);
  };

  return (
    <Moving.Provider
      value={{
        selected,
        SetSelected,
        round,
        NextRoundHandler,
        RotateHandler,
        FlipHandler,
        action,
        updateCellItemSelected,
        cellItemSelected,
        deleteHandler,
        deleteItem,
        upgradeAction,
        changeCellItemSelected,
        placedAllItem,
        updatePlacedAllItems,
        saveAction,
        selectedId,
        ChangeSelectedPieceId,
      }}
    >
      {children}
    </Moving.Provider>
  );
}

export default Moving;
