import React from "react";
import Board from "./components/Board";
import Specials from "./components/Specials";
import Normals from "./components/Normals";
import Controls from "./components/Controls";
import Moving from "./data/Moving";
import "./App.css";

function App() {
  const { NextRoundHandler } = React.useContext(Moving);

  return (
    <div className="App">
      {/* Board */}
      <Board />
      <div className="PiecesPlace">
        <div>
          <div onClick={() => NextRoundHandler()}>Next round</div>
          <Controls />
        </div>
        <Specials />
        <Normals />
      </div>
    </div>
  );
}

export default App;
