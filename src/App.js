import React from 'react';
import Board from "./components/Board";
import Specials from "./components/Specials";
import Normals from "./components/Normals";
import Controls from "./components/Controls";
import Moving from "./data/Moving";
import "./App.css";

function App() {
  const {NextRoundHandler} = React.useContext(Moving);

  return <div className="App">

    {/* Board */}
    <Board />
    <Specials />
    <Normals />
    <Controls />
    <div onClick={() => NextRoundHandler()}>Next round</div>

  </div>;
}

export default App;
