import React, { useContext } from "react";
import Remove from "../Icons/Remove";
import Flip from "../Icons/Flip";
import RotateLeft from "../Icons/RotateLeft";
import RotateRight from "../Icons/RotateRight";
import "./Controls.css";
import Moving from "../data/Moving";

const Controls = () => {
  const { selected, RotateHandler, FlipHandler, deleteHandler } =
    useContext(Moving);

  return (
    <div id="controls">
      {selected !== "" ? (
        <>
          <div className="controlItem" onClick={() => RotateHandler(-1)}>
            <div className="SettingsIcon">
              <RotateLeft />
            </div>
          </div>
          <div className="controlItem" onClick={() => RotateHandler(1)}>
            <div className="SettingsIcon">
              <RotateRight />
            </div>
          </div>
          <div className="controlItem" onClick={() => FlipHandler()}>
            <div className="SettingsIcon">
              <Flip />
            </div>
          </div>
          <div className="controlItem" onClick={() => deleteHandler(true)}>
            <div className="SettingsIcon">
              <Remove />
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Controls;
