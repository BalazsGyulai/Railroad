import React from "react";
import Board from "./components/Board";
import Specials from "./components/Specials";
import Normals from "./components/Normals";
import Controls from "./components/Controls";
import Moving from "./data/Moving";
import "./App.css";
import Piece from "./components/Piece";
import Expand from "./Icons/Expand";

function App() {
  const { NextRoundHandler, selected } = React.useContext(Moving);

  const [wWidth, setwWidth] = React.useState(window.innerWidth);
  const [showPieces, setShowPieces] = React.useState(window.innerWidth < 769 ? false : true);
  const [PieceSize, setPieceSize] = React.useState(0);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  React.useEffect(() => {
    handleWindowResize();
  }, []);

  const handleWindowResize = () => {
    setwWidth(window.innerWidth);

    let x = window.innerWidth;
    let y = window.innerHeight;

    if (x < 769) {
      if (y / 2 < x) {
        setPieceSize(y / 2 / 9);
      } else {
        setPieceSize(x / 9);
      }
    } else {
      if (x / 2 < y) {
        if (x / 2 / 9 > 65) {
          setPieceSize(65);
        } else {
          setPieceSize(x / 2 / 9);
        }
      } else {
        if (y / 9 > 65) {
          setPieceSize(65);
        } else {
          setPieceSize(y / 9);
        }
      }
    }
  };

  return (
    <div className="App">
      {/* Board */}
      <Board />
      <div className="PiecesPlace">
        <div>
          <div className="nextRoundBtn" onClick={() => NextRoundHandler()}>Next round</div>
          <Controls />
        </div>
        <div
          className="PiecesHolder"
          style={{
            height: showPieces ? wWidth < 769 ? "40vh" : "100vh" : `${PieceSize + 10}px`,
            overflow: showPieces ? "auto" : "hidden",
          }}
        >
          {wWidth < 769 ? (
            <div className="ExpandBtn">
              <div
                className="ShowMore"
                onClick={() => setShowPieces(!showPieces)}
                style={{
                  height: `${PieceSize + 10}px`,
                  background: showPieces ? "rgb(0, 106, 255)" : "rgb(255,255,255)",
                  fill: showPieces ? "#fff" : "rgb(0, 59, 143)"
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
                    height: PieceSize,
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
