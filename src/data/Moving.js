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
    let turnable = selected.rotated;

    turnable = turnable + val;

    if (turnable < 0){
      turnable = 3;
    } else if(turnable > 3) {
      turnable = 0;
    }
    
    SetSelected({...selected, rotated: turnable});
  }

  const FlipHandler = () => {
    let flipable = selected.flip;

    if(flipable === 0){
      flipable = -1;
    } else {
      flipable = 0;
    }

    SetSelected({...selected, flip: flipable});
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
