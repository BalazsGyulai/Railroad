import React from "react";

const PlayerEarnedPoints = ({ cellSize, EarnedPoints, icon, fill }) => {
  return (
    <div
      className="EarnedPoints"
      style={{
        width: `${cellSize * 0.7 * 2 - (cellSize * 0.3) / 2}px`,
        height: `${cellSize * 0.7 - 10}px`
      }}
    >
      <div
        className="Icon"
        style={{
          fill: `${fill ?? "#fff"}`
        }}
      >
        {icon}
      </div>
      <div className="Points">{EarnedPoints}</div>
    </div>
  );
};

export default PlayerEarnedPoints;
