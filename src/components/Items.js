import React from "react";
import Road from "../Rails/Road";
import "./Items.css";

const Items = () => {
    const handleDragStart = (e) => {
        console.log(e.target);
    }

    const handleDragEnter = (e) => {
        console.log(e.target);
    }

  return (
    <div draggable onDragStart={handleDragStart} onDragEnter={handleDragEnter} className="items">
      <Road />
    </div>
  );
};

export default Items;
