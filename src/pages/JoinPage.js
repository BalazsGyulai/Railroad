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
  const { cellSize, board } = useContext(BoardManage);
  const [code, setCode] = useState("");
  const [players, setPlayers] = useState("");
  const {
    baseURL,
    PageHandler,
    page,
    SocketupgradePage,
    SocketPlayerStatus,
    socket,
    changeUserStatus,
  } = useContext(LoginData);
  const { round, RoundHandler } = useContext(Moving);
  const [amdinPage, setPage] = useState("players");
  const [cubes, setCubes] = useState("");
  const [selectedcubes, setselectedCubes] = useState("");
  const [copied, setCopied] = useState(false);
  const [showBoard, setShowBoard] = useState("");
  const [showBoardPlayer, setShowBoardPlayer] = useState(0);

  useEffect(() => {
    setCode(JSON.parse(sessionStorage.getItem("user")).code);

    if (JSON.parse(sessionStorage.getItem("user")).rank === "admin") {
      getPlayers(JSON.parse(sessionStorage.getItem("user")).code);
    }

    setCubes(new NORMALS());

    if (showBoard === "") {
      setShowBoard({
        username: "Bali",
        userBoard: board,
      });
    }

    socket.on("changedPlayerStatus", ({ status, id }) => {
      getPlayers(JSON.parse(sessionStorage.getItem("user")).code);
    });
  }, []);

  async function getPlayers(code) {
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
  }

  const SelectCube = (index) => {
    setselectedCubes([...selectedcubes, cubes[index]]);
  };

  const deleteRolled = (index) => {
    let rolled = selectedcubes;

    rolled.splice(index, 1);
    setselectedCubes([...rolled]);
  };

  const startGameHandler = async () => {
    await fetch(`${baseURL}statusPlayer.php`, {
      method: "post",
      body: JSON.stringify({
        code: JSON.parse(sessionStorage.getItem("user")).code,
        id: JSON.parse(sessionStorage.getItem("user")).id,
        status: "allunready",
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.status === "ok") {
        } else if (data.status === "failed to connect") {
          console.log("failed to connect");
        } else {
          console.log("something is wrong");
        }
      });

    await fetch(`${baseURL}nextGame.php`, {
      method: "post",
      body: JSON.stringify({
        round,
        code: JSON.parse(sessionStorage.getItem("user")).code,
        rolled: selectedcubes,
        page: "game",
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.status === "ok") {
          PageHandler("game");
        } else if (data.status === "failed to connect") {
          console.log("failed to connect");
        } else {
          console.log("something is wrong");
        }
      });

    SocketupgradePage("game");
    PageHandler("game");
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
          SocketupgradePage("join");
          RoundHandler(0);
        } else if (data.status === "failed to connect") {
          console.log("failed to connect");
        } else {
          console.log("something is wrong");
        }
      });
  };

  const setsRollItems = async () => {
    // SocketupgradePage("roll");
    if (round < 7) {
      await fetch(`${baseURL}statusPlayer.php`, {
        method: "post",
        body: JSON.stringify({
          code: JSON.parse(sessionStorage.getItem("user")).code,
          id: JSON.parse(sessionStorage.getItem("user")).id,
          status: "allready",
        }),
      })
        .then((data) => data.json())
        .then((data) => {
          if (data.status === "ok") {
          } else if (data.status === "failed to connect") {
            console.log("failed to connect");
          } else {
            console.log("something is wrong");
          }
        });
    }

    await fetch(`${baseURL}setPage.php`, {
      method: "post",
      body: JSON.stringify({
        code: JSON.parse(sessionStorage.getItem("user")).code,
        page: round < 7 ? "roll" : "calculate",
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.status === "ok") {
          PageHandler("roll");
        } else if (data.status === "failed to connect") {
          console.log("failed to connect");
        } else {
          console.log("something is wrong");
        }
      });

    if (round < 7) {
      SocketupgradePage("roll");
    } else {
      SocketupgradePage("calculate");
    }
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

  const PlayerBoardShow = (val) => {
    fetch(`${baseURL}showPlayerBoard.php`, {
      method: "post",
      body: JSON.stringify({
        code: JSON.parse(sessionStorage.getItem("user")).code,
        actual: showBoardPlayer + val,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.status === "ok") {
          setShowBoard(data.users);
          // RoundHandler(data.page.round);
        } else if (data.status === "failed to connect") {
          console.log("failed to connect");
        } else {
          console.log("something is wrong");
        }
      });
    setShowBoardPlayer(showBoardPlayer + val);
  };

  const Unready = async () => {
    await fetch(`${baseURL}statusPlayer.php`, {
      method: "post",
      body: JSON.stringify({
        code: JSON.parse(sessionStorage.getItem("user")).code,
        id: JSON.parse(sessionStorage.getItem("user")).id,
        status: "unready",
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.status === "ok") {
        } else if (data.status === "failed to connect") {
          console.log("failed to connect");
        } else {
          console.log("something is wrong");
        }
      });

    SocketPlayerStatus({
      status: "unready",
      id: JSON.parse(sessionStorage.getItem("user")).id,
    });
    changeUserStatus("unready");
  };

  return (
    <div id="JoinPage">
      {JSON.parse(sessionStorage.getItem("user")).rank === "admin" ? (
        page === "join" ? (
          <>
            <div onClick={() => Unready()}>Vissza</div>
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
            <Board custumBoard={showBoard.userBoard} />
            <div className="NewGameBtns">
              <div className="Controls">
                <button
                  className="ControlsBtn"
                  onClick={() => PlayerBoardShow(1)}
                >
                  Next
                </button>
                <div className="PlayerName">{showBoard.username}</div>
                <button
                  className="ControlsBtn"
                  onClick={() => PlayerBoardShow(-1)}
                >
                  Prev
                </button>
              </div>

              <button onClick={() => ResetGame()}>Új játék</button>
            </div>
          </div>
        )
      ) : page === "join" || page === "game" ? (
        <div className="waiting">
          <p>Várakozás a többi játékosra!</p>
          <button onClick={() => Unready()}>Nem vagyok kész!</button>
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
