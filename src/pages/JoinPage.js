import React, { useEffect, useState, useContext } from "react";
import LoginData from "../data/Login";
import "./JoinPage.css";
import CodeImg from "../Icons/CodeImg";
import Moving from "../data/Moving";

const JoinPage = () => {
  const [code, setCode] = useState("");
  const [players, setPlayers] = useState("");
  const { baseURL } = useContext(LoginData);
  const {round} = useContext(Moving);

  useEffect(() => {
    setCode(JSON.parse(sessionStorage.getItem("user")).code);

    if (JSON.parse(sessionStorage.getItem("user")).rank === "admin") {
      getPlayers(JSON.parse(sessionStorage.getItem("user")).code);
    }
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

  const startGameHandler = () => {
    fetch(`${baseURL}nextGame.php`, {
      method: "post",
      body: JSON.stringify({
        round,
        code: JSON.parse(sessionStorage.getItem("user")).code
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
  };

  return (
    <div id="JoinPage">
      {JSON.parse(sessionStorage.getItem("user")).rank === "admin" ? (
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
            <button onClick={() => startGameHandler()}>Játék indítása</button>
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
      ) : (
        <div className="waiting">
          <p>Várakozás a többi játékosra!</p>
        </div>
      )}
    </div>
  );
};

export default JoinPage;
