import { createContext, useState, useEffect, useContext } from "react";
import LoginMange from "./Login";

const Moving = createContext();

export function MovingManage({ children }) {
  const {loggedIn, mode, baseURL} = useContext(LoginMange);
  const [selected, useSelected] = useState("");
  const [round, setRound] = useState(0);
  const [action, setAction] = useState(false);
  const [deleteItem, setDeleteItem] = useState(false);
  const [cellItemSelected, setCellItemSelected] = useState("");
  const [placedAllItem, setPlacedAllItems] = useState(false);

  useEffect(() =>{
    if (loggedIn === false && mode === "creative"){
      RoundHandler(1);
    } else if(loggedIn && mode === "multiPlayer") {
      // setInterval(() => {
      //   fetch(`${baseURL}page.php`, {
      //     method: "post",
      //     body: JSON.stringify({
      //       code: JSON.parse(sessionStorage.getItem("user")).code,
      //     }),
      //   })
      //     .then((data) => data.json())
      //     .then((data) => {
      //       if (data.status === "ok") {
      //         // console.log(data.page.round)
      //         RoundHandler(data.page.round);
      //       } else if (data.status === "failed to connect") {
      //         console.log("failed to connect");
      //       } else {
      //         console.log("something is wrong");
      //       }
      //     });
      // }, 1000);
    }

  }, [mode, loggedIn])
  
  const updatePlacedAllItems = (val) => {
    setPlacedAllItems(val)
  } 

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

  // ---------------------------------------
  // This is called when an item is tapped.
  // This compares when to select or unselect a piece
  // ---------------------------------------
  const SetSelected = (newest) => {
    useSelected(AnalyseSelected(newest));

    // reset cell item selected
    // if (cellItemSelected !== "") {
    //   changeCellItemSelected(AnalyseSelected(newest));
    // }
  };

  const AnalyseSelected = (newest) => {
    if (newest.name === selected.name) {
      return "";
    } else {
      return newest;
    }
  };

  // ---------------------------------------
  // This is called when the round is changes
  // ---------------------------------------

  const RoundHandler = (val) => {
    setRound(val);
  }

  const NextRoundHandler = () => {
    RoundHandler(round + 1);

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
  };

  const FlipHandler = () => {
    let flipable = selected;

    if (flipable.flip === 0) {
      flipable.flip = -1;
    } else {
      flipable.flip = 0;
    }

    upgradeAction();
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
        updatePlacedAllItems
      }}
    >
      {children}
    </Moving.Provider>
  );
}

export default Moving;
