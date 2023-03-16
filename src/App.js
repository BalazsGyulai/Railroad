import React from 'react'
import Board from "./components/Board"
import Specials from "./components/Specials"
import "./App.css";

function App() {
  return <div className="App">

    {/* Board */}
    <Board />
    <Specials />
  </div>;
}

export default App;
