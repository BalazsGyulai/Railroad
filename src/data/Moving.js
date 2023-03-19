import { createContext, useState } from "react";

const Moving = createContext();

export function MovingManage({ children }) {
  const [selected, useSelected] = useState("");
  const [round, setRound] = useState(1);
  

  const SetSelected = (newest) => {
    useSelected(AnalyseSelected(newest));
    
  };

  const AnalyseSelected = (newest) => {
    if (newest.name === selected.name) {
      return "";
    } else {
      return newest;
    }
  };

  const UnselectTheSelectedPiece = () => {
    useSelected("");
  };

  const NextRoundHandler = () => {
    setRound(round + 1);
  };

  const RotateHandler = (val) => {
    let turnable = selected;

    turnable.rotated = turnable.rotated + val;

    if (turnable.rotated < 0){
      turnable.rotated = 3;
    } else if(turnable.rotated > 3) {
      turnable.rotate = 0;
    }
    
    SetSelected(turnable);
  }

  const FlipHandler = () => {
    let flipable = selected;

    if(flipable.flip === 0){
      flipable.flip = -1;
    } else {
      flipable.flip = 0;
    }

    SetSelected(flipable);
  }

  return (
    <Moving.Provider
      value={{
        selected,
        SetSelected,
        UnselectTheSelectedPiece,
        round,
        NextRoundHandler,
        RotateHandler,
        FlipHandler
      }}
    >
      {children}
    </Moving.Provider>
  );
}

export default Moving;
