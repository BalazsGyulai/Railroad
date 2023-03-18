import React from 'react';
import Board from "./components/Board";
import Specials from "./components/Specials";
import Normals from "./components/Normals";
import Controls from "./components/Controls";
import "./App.css";

function App() {
  return <div className="App">

    {/* Board */}
    <Board />
    <Specials />
    <Normals />
    <Controls />

  </div>;
}

export default App;
