import { createContext, useState } from "react";

const Moving = createContext();

export function MovingManage({ children }) {
  const [selected, useSelected] = useState("");
  const [round, setRound] = useState(1);
  const [action, setAction] = useState(false);
  const [deleteItem, setDeleteItem] = useState(false);
  const [cellItemSelected, setCellItemSelected] = useState("");
  const [placedAllItem, setPlacedAllItems] = useState(false);

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
  const NextRoundHandler = () => {
    setRound(round + 1);

    // reset selected
    SetSelected("");

    upgradeAction();
  };

  // -----------------------------------------
  // This handles the Controls component clicks
  // -----------------------------------------
  const RotateHandler = (val) => {
    let turnable = selected;
    let temp = "";

    selected.rotated = selected.rotated + val;
    
    if (val > 0) { // turning right
      temp = selected.look[3];
      for (let i = 3; i > 0; i--) {
        selected.look[i] = selected.look[i - 1];
      }
      selected.look[0] = temp;
    } else { // turning left
      temp = selected.look[0];
      for (let i = 0; i < 3; i++) {
        selected.look[i] = selected.look[i + 1];
      }
      selected.look[3] = temp;
    }

    if (selected.rotated < 0) {
      selected.rotated = 3;
    } else if (selected.rotated > 3) {
      selected.rotated = 0;
    }

    upgradeAction();
  };

  const FlipHandler = () => {
    let flipable = selected;
    let temp = "";

    if (flipable.rotated % 2 == 0){ // left <-> right
      temp = flipable.look[1];
      flipable.look[1] = flipable.look[3];
      flipable.look[3] = temp;

    } else { // top <-> bottom
      temp = flipable.look[0];
      flipable.look[0] = flipable.look[2];
      flipable.look[2] = temp;
    }
    if (flipable.flip === 0) {
      flipable.flip = 1;
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
