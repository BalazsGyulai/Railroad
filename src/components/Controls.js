import React from 'react';
import Remove from "../Icons/Remove";
import Flip from "../Icons/Flip";
import RotateLeft from "../Icons/RotateLeft";
import RotateRight from "../Icons/RotateRight";
import "./Controls.css";

const Controls = () => {
  return (
    <div id="controls">
        <div className="controlItem">
            <RotateLeft />
        </div>
        <div className="controlItem">
            <RotateRight />
        </div>
        <div className="controlItem">
            <Flip />
        </div>
        <div className="controlItem">
            <Remove />
        </div>
    </div>
  )
}

export default Controls