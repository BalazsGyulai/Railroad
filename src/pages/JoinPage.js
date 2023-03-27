import React, { useEffect, useState, useContext } from "react";
import LoginData from "../data/Login";
import "./JoinPage.css";
import CodeImg from "../Icons/CodeImg";
import Moving from "../data/Moving";
import BoardManage from "../data/Board";
import A0 from "../Rails/A0";
import A1 from "../Rails/A1";
import A2 from "../Rails/A2";
import A3 from "../Rails/A3";
import A4 from "../Rails/A4";
import A5 from "../Rails/A5";
import B0 from "../Rails/B0";
import B1 from "../Rails/B1";
import B2 from "../Rails/B2";

function NORMALS() {
  return [
    {
      name: "A0",
      item: <A0 />,
      rotated: 0,
      flip: 0,
      round: 0,
      look: ["s", null, null, "s"],
    },
    {
      name: "A1",
      item: <A1 />,
      rotated: 0,
      flip: 0,
      round: 0,
      look: ["s", "s", null, "s"],
    },
    {
      name: "A2",
      item: <A2 />,
      rotated: 0,
      flip: 0,
      round: 0,
      look: ["s", null, "s", null],
    },
    {
      name: "A3",
      item: <A3 />,
      rotated: 0,
      flip: 0,
      round: 0,
      look: ["u", null, null, "u"],
    },
    {
      name: "A4",
      item: <A4 />,
      rotated: 0,
      flip: 0,
      round: 0,
      look: ["u", "u", null, "u"],
    },
    {
      name: "A5",
      item: <A5 />,
      rotated: 0,
      flip: 0,
      round: 0,
      look: ["u", null, "u", null],
    },
    {
      name: "B0",
      item: <B0 />,
      rotated: 0,
      flip: 0,
      round: 0,
      look: ["u", "s", "u", "s"],
    },
    {
      name: "B1",
      item: <B1 />,
      rotated: 0,
      flip: 0,
      round: 0,
      look: ["s", null, "u", null],
    },
    {
      name: "B2",
      item: <B2 />,
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
  const { baseURL, PageHandler } = useContext(LoginData);
  const { round } = useContext(Moving);
  const [page, setPage] = useState("players");
  const [cubes, setCubes] = useState("");
  const [selectedcubes, setselectedCubes] = useState("");

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

  const startGameHandler = () => {
    fetch(`${baseURL}nextGame.php`, {
      method: "post",
      body: JSON.stringify({
        round,
        code: JSON.parse(sessionStorage.getItem("user")).code,
        rolled: selectedcubes,
        page: "game"
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        if (data.status === "ok") {
            // PageHandler("game");
        } else if (data.status === "failed to connect") {
          console.log("failed to connect");
        } else {
          console.log("something is wrong");
        }
      });
  };

  const setsRollItems = () => {
    upgradePage("roll");
  };

  const upgradePage = (val) => {
    setPage(val);
  };

  return (
    <div id="JoinPage">
      {JSON.parse(sessionStorage.getItem("user")).rank === "admin" ? (
        page === "players" ? (
          <>
            <div className="joinInfos">
              <div>
                <CodeImg />
              </div>
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
        ) : page === "roll" ? (
          <>
            <div className="GameBtn">
              <button onClick={() => startGameHandler()}>Játék indítása</button>
            </div>
            <div className="cubes">
              {cubes !== ""
                ? cubes.map((face, index) => (
                    <div key={index} onClick={() => SelectCube(index)}>
                      <div
                        style={{
                          width: `${cellSize}px`,
                          height: `${cellSize}px`,
                        }}
                      >
                        {face.item}
                      </div>
                    </div>
                  ))
                : ""}
            </div>

            <div className="selectedCubes">
              {selectedcubes !== ""
                ? selectedcubes.map((cube, index) => (
                    <div key={index}>
                      <div
                        style={{
                          width: `${cellSize}px`,
                          height: `${cellSize}px`,
                        }}
                      >
                        {cube.item}
                      </div>
                    </div>
                  ))
                : ""}
            </div>
          </>
        ) : (
          ""
        )
      ) : (
        <div className="waiting">
          <p>Várakozás a többi játékosra!</p>
        </div>
      )}
    </div>
  );
};

export default JoinPage;
