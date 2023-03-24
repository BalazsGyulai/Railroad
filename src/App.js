import React from "react";
import Board from "./components/Board";
import Specials from "./components/Specials";
import Normals from "./components/Normals";
import Controls from "./components/Controls";
import Moving from "./data/Moving";
import "./App.css";
import Expand from "./Icons/Expand";
import BoardTable from "./data/Board";

function App() {
  const { NextRoundHandler, selected } = React.useContext(Moving);
  const { cellSize, windowSize } = React.useContext(BoardTable);
  const [showPieces, setShowPieces] = React.useState(
    windowSize.x < 769 ? false : true
  );

  return (
    <div className="App">
      {/* Board */}
      <Board />
      <div className="PiecesPlace">
        <div>
          <div className="nextRoundBtn" onClick={() => NextRoundHandler()}>
            Next round
          </div>
          <Controls />
        </div>
        <div
          className="PiecesHolder"
          style={{
            height: windowSize.x < 769 ? showPieces ? "40vh" : `${cellSize + 10}px` : "100vh",
            overflow: showPieces ? "auto" : "hidden",
          }}
        >
          {windowSize.x < 769 ? (
            <div className="ExpandBtn">
              <div
                className="ShowMore"
                onClick={() => setShowPieces(!showPieces)}
                style={{
                  height: `${cellSize + 10}px`,
                  background: showPieces
                    ? "rgb(0, 106, 255)"
                    : "rgb(255,255,255)",
                  fill: showPieces ? "#fff" : "rgb(0, 59, 143)",
                }}
              >
                <div
                  className="icon"
                  style={{
                    transform: showPieces ? "rotate(180deg)" : "rotate(0)",
                  }}
                >
                  <Expand />
                </div>
              </div>

              {selected !== "" ? (
                <div
                  className="ShowSelected"
                  style={{
                    transform: `rotate(${selected.rotated * 90}deg) rotateY(${
                      selected.flip * 180
                    }deg)`,
                    height: cellSize,
                  }}
                >
                  {selected.item}
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
          <Specials />
          <Normals />
        </div>
      </div>
    </div>
  );
}

export default App;
