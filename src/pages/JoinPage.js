import React, { useEffect, useState, useContext } from "react";
import LoginData from "../data/Login";
import "./JoinPage.css";
import CodeImg from "../Icons/CodeImg";
import Moving from "../data/Moving";
import BoardManage from "../data/Board";
import Piece from "../components/Piece";
import Clipboard from "../Icons/Clipboard";
import Board from "../components/Board";

function NORMALS() {
  return [
    {
      name: "A0",
      rotated: 0,
      flip: 0,
      round: 0,
      look: ["s", null, null, "s"],
    },
    {
      name: "A1",
      rotated: 0,
      flip: 0,
      round: 0,
      look: ["s", "s", null, "s"],
    },
    {
      name: "A2",
      rotated: 0,
      flip: 0,
      round: 0,
      look: ["s", null, "s", null],
    },
    {
      name: "A3",
      rotated: 0,
      flip: 0,
      round: 0,
      look: ["u", null, null, "u"],
    },
    {
      name: "A4",
      rotated: 0,
      flip: 0,
      round: 0,
      look: ["u", "u", null, "u"],
    },
    {
      name: "A5",
      rotated: 0,
      flip: 0,
      round: 0,
      look: ["u", null, "u", null],
    },
    {
      name: "B0",
      rotated: 0,
      flip: 0,
      round: 0,
      look: ["u", "s", "u", "s"],
    },
    {
      name: "B1",
      rotated: 0,
      flip: 0,
      round: 0,
      look: ["s", null, "u", null],
    },
    {
      name: "B2",
      rotated: 0,
      flip: 0,
      round: 0,
      look: ["s", null, null, "u"],
    },
  ];
}

const JoinPage = () => {
  const { cellSize } = useContext(BoardManage);
  const [code, setCode] = useState("");
  const [players, setPlayers] = useState("");
  const { baseURL, PageHandler, page } = useContext(LoginData);
  const { round } = useContext(Moving);
  const [amdinPage, setPage] = useState("players");
  const [cubes, setCubes] = useState("");
  const [selectedcubes, setselectedCubes] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCode(JSON.parse(sessionStorage.getItem("user")).code);

    if (JSON.parse(sessionStorage.getItem("user")).rank === "admin") {
      getPlayers(JSON.parse(sessionStorage.getItem("user")).code);
    }

    setCubes(new NORMALS());
  }, []);

  async function getPlayers(code) {
    setInterval(() => {
      fetch(`${baseURL}players.php`, {
        method: "post",
        body: JSON.stringify({
          code,
        }),
      })
        .then((data) => data.json())
        .then((data) => {
          if (data.status === "ok") {
            setPlayers(data.users);
          } else if (data.status === "failed to connect") {
            console.log("failed to connect");
          } else {
            console.log("something is wrong");
          }
        });
    }, 1000);
  }

  const SelectCube = (index) => {
    setselectedCubes([...selectedcubes, cubes[index]]);
  };

  const deleteRolled = (index) => {
    let rolled = selectedcubes;

    rolled.splice(index, 1);
    setselectedCubes([...rolled]);
  };

  const startGameHandler = () => {
    fetch(`${baseURL}nextGame.php`, {
      method: "post",
      body: JSON.stringify({
        round,
        code: JSON.parse(sessionStorage.getItem("user")).code,
        rolled: selectedcubes,
        page: "game",
      }),
    })
   
  };

  const ResetGame = () => {
    fetch(`${baseURL}ResetGame.php`, {
      method: "post",
      body: JSON.stringify({
        round: 0,
        code: JSON.parse(sessionStorage.getItem("user")).code,
        rolled: null,
        page: "join",
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.status === "ok") {
          PageHandler("join");
        } else if (data.status === "failed to connect") {
          console.log("failed to connect");
        } else {
          console.log("something is wrong");
        }
      });
  };

  const setsRollItems = () => {
    upgradePage("roll");

    fetch(`${baseURL}setPage.php`, {
      method: "post",
      body: JSON.stringify({
        code: JSON.parse(sessionStorage.getItem("user")).code,
        page: round < 7 ? "roll" : "calculate",
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.status === "ok") {
          // RoundHandler(data.page.round);
        } else if (data.status === "failed to connect") {
          console.log("failed to connect");
        } else {
          console.log("something is wrong");
        }
      });
  };

  const upgradePage = (val) => {
    setPage(val);
  };

  const copyCode = async (copy) => {
    try {
      navigator.clipboard.writeText(copy);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div id="JoinPage">
      {JSON.parse(sessionStorage.getItem("user")).rank === "admin" ? (
        page === "join" ? (
          <>
            <div className="joinInfos" onClick={() => copyCode(code)}>
              <div>{copied ? <Clipboard /> : <CodeImg />}</div>
              <div>
                <p>Oszd meg a kódot másokkal, hogy együtt tudjatok játszani!</p>
                <p>{code}</p>
              </div>
            </div>

            <div className="GameBtn">
              <button onClick={() => setsRollItems()}>Dobás</button>
            </div>

            <div className="players">
              <div className="headerCell">
                <div>Név</div>
                <div>Státusz</div>
              </div>
              {players !== ""
                ? players.map((player) => (
                    <div key={player.id}>
                      <div>{player.username}</div>
                      <div>{player.status}</div>
                    </div>
                  ))
                : ""}
            </div>
          </>
        ) : page === "roll" && round < 7 ? (
          <>
            <div className="GameBtn">
              {selectedcubes.length > 0 ? (
                <button onClick={() => startGameHandler()}>
                  Játék indítása
                </button>
              ) : (
                ""
              )}
            </div>
            <div className="cubesHolder">
              <div className="cubes">
                {selectedcubes.length < 4
                  ? cubes !== ""
                    ? cubes.map((face, index) => (
                        <Piece
                          key={index}
                          piece={face}
                          borderRadius={10}
                          selectedColor="#fff"
                          baseColor="rgb(0, 106, 255)"
                          callClicked={() => SelectCube(index)}
                        />
                      ))
                    : ""
                  : ""}
              </div>
            </div>

            <div className="selectedCubesHolder">
              <div
                className="selectedCubes"
                style={{
                  width: `${(cellSize + 50) * 2}px`,
                }}
              >
                {selectedcubes !== ""
                  ? selectedcubes.map((cube, index) => (
                      <Piece
                        key={index}
                        piece={cube}
                        borderRadius={10}
                        selectedColor="#fff"
                        baseColor="#fff"
                        callClicked={() => deleteRolled(index)}
                      />
                    ))
                  : ""}
              </div>
            </div>
          </>
        ) : (
          <div className="newGameHolder">
            <Board />
            <div className="NewGameBtns">
              <div className="Controls">
                <div className="ControlsBtn">Next</div>
                <div className="PlayerName">Bali</div>
                <div className="ControlsBtn">Prev</div>
              </div>

              <button onClick={() => ResetGame()}>Új játék</button>
            </div>
          </div>
        )
      ) : page === "join" ? (
        <div className="waiting">
          <p>Várakozás a többi játékosra!</p>
        </div>
      ) : page === "roll" ? (
        <div className="waiting">
          <p>Dobás!</p>
        </div>
      ) : page === "calculate" ? (
        <Board />
      ) : (
        ""
      )}
    </div>
  );
};

export default JoinPage;