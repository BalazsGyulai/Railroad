import React, { useContext } from "react";
import Remove from "../Icons/Remove";
import Flip from "../Icons/Flip";
import RotateLeft from "../Icons/RotateLeft";
import RotateRight from "../Icons/RotateRight";
import "./Controls.css";
import Moving from "../data/Moving";

const Controls = () => {
  const { selected } = useContext(Moving);

  const RotateHandler = (val) => {
    console.log(val);
  };

  return (
    <div id="controls">
      {selected !== "" ? (
        <>
          <div className="controlItem" onClick={() => RotateHandler(-1)}>
            <RotateLeft />
          </div>
          <div className="controlItem" onClick={() => RotateHandler(1)}>
            <RotateRight />
          </div>
          <div className="controlItem">
            <Flip />
          </div>
          <div className="controlItem">
            <Remove />
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Controls;
