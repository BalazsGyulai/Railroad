import { createContext, useState } from "react";

const Moving = createContext();

export function MovingManage({ children }) {
  const [selected, useSelected] = useState("");
  const [round, setRound] = useState(1);

  const SetSelected = (newest) => {
    useSelected(AnalyseSelected(newest));
    console.log(newest);
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

  return (
    <Moving.Provider
      value={{
        selected,
        SetSelected,
        UnselectTheSelectedPiece,
        round,
        NextRoundHandler,
      }}
    >
      {children}
    </Moving.Provider>
  );
}

export default Moving;
