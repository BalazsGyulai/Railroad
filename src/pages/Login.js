import React, { useContext, useState } from "react";
import LoginData from "../data/Login";
import "./Login.css";
import NextArrow from "../Icons/NextArrow";

const Login = () => {
  const { modeHandler, baseURL,loggedInHandler } = useContext(LoginData);
  const [page, setPage] = useState(0);
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [group, setGroup] = useState("");

  const [selectedMode, setSelectedMode] = useState("");

  const groupHandler = (e) => {
    setGroup(e.target.value);
  };

  const StartHandling = () => {
    fetch(`${baseURL}login.php`, {
      method: "post",
      body: JSON.stringify({
        email,
        userName,
        group
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.status === "ok"){
          sessionStorage.setItem("user", JSON.stringify(data.userInfos));
          modeHandler("multiPlayer");
          loggedInHandler(true);
        } else if (data.status === "failed to connect") {
          console.log("failed to connect");
        } else {
          console.log("something is wrong");
        }
      });
  };

  const SelectedModeHandler = (val) => {
    setSelectedMode(val);

    if (val === "creative") {
      modeHandler(val);
    }
  };

  const EmailHandler = (e) => {
    setEmail(e.target.value);
  };

  const usernameHandler = (e) => {
    setUserName(e.target.value);
  };

  const pageHandler = (val) => {
    setPage(val);
  };

  return (
    <div id="LoginPage">
      <div className="PageDivider LoginHolder">
        {selectedMode === "" ? (
          <div className="BasicInfos">
            <h1>Játék</h1>
            <div>
              <button
                className="chooseGameMode"
                onClick={() => SelectedModeHandler("multiPlayer")}
              >
                Többjátékos
              </button>
            </div>
            <div>
              <button
                className="chooseGameMode"
                onClick={() => SelectedModeHandler("creative")}
              >
                Kreatív
              </button>
            </div>
          </div>
        ) : selectedMode === "multiPlayer" ? (
          page === 0 ? (
            <div className="BasicInfos">
              <button className="back" onClick={() => SelectedModeHandler("")}>
                <NextArrow />
              </button>
              <h1>Email cím:</h1>
              <input type="email" value={email} onChange={EmailHandler} />

              <button
                className="nextBtn"
                style={{
                  visibility: email !== "" ? "visible" : "hidden",
                }}
                onClick={() => pageHandler(1)}
              >
                <NextArrow />
              </button>
            </div>
          ) : page === 1 ? (
            <div className="BasicInfos">
              <button className="back" onClick={() => pageHandler(0)}>
                <NextArrow />
              </button>
              <h1>Felhasználónév:</h1>
              <input type="text" value={userName} onChange={usernameHandler} />
              <h1>Belépési kód:</h1>
              <input type="text" value={group} onChange={groupHandler} />
              <button
                className="chooseGameMode"
                style={{
                  visibility: userName !== "" ? "visible" : "hidden",
                }}
                onClick={() => StartHandling()}
              >
                START
              </button>
            </div>
          ) : (
            ""
          )
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Login;
