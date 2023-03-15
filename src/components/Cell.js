import React, {useState} from "react";
import "./Cell.css";

const Cell = (props) => {
  const initBorderColor = props.borderColor ?? "#fff";
  const initBorderLeftColor =
    props.borderLeftColor ?? initBorderColor ?? "#fff";
  const initBorderBottomColor =
    props.borderBottomColor ?? initBorderColor ?? "#fff";
  const initBorderRightColor =
    props.borderRightColor ?? initBorderColor ?? "#fff";
  const initBorderTopColor = props.borderTopColor ?? initBorderColor ?? "#fff";
  const initRotate = props.rotate ?? 0;
  const [dropp, setDropp] = useState(props.dropp ?? false);

  const handleDragEnter = (e) => {
    console.log(e.target);
    e.target.style.background = "#f00";
  };

  return (
    <div
      className="cell"
      style={{
        borderColor: initBorderColor,
        borderLeftColor: initBorderLeftColor,
        borderBottomColor: initBorderBottomColor,
        borderRightColor: initBorderRightColor,
        borderTopColor: initBorderTopColor,
      }}
    >
      <div className="object" style={{ transform: `rotate(${initRotate})` }}>
        {dropp ? (
          <div droppable onDragEnter={handleDragEnter}>
            {props.children}
          </div>
        ) : (
          props.children
        )}
      </div>
    </div>
  );
};

export default Cell;
