import React from "react";
import Board from "./components/Board";
import Specials from "./components/Specials";
import Normals from "./components/Normals";
import Controls from "./components/Controls";
import Moving from "./data/Moving";
import "./App.css";
import Expand from "./Icons/Expand";
import BoardTable from "./data/Board";
import LoginData from "./data/Login";
import Login from "./pages/Login";
import JoinPage from "./pages/JoinPage";
import A0 from "./Rails/A0";
import A1 from "./Rails/A1";
import A2 from "./Rails/A2";
import A3 from "./Rails/A3";
import A4 from "./Rails/A4";
import A5 from "./Rails/A5";
import B0 from "./Rails/B0";
import B1 from "./Rails/B1";
import B2 from "./Rails/B2";
import S0 from "./Rails/S0";
import S1 from "./Rails/S1";
import S2 from "./Rails/S2";
import S3 from "./Rails/S3";
import S4 from "./Rails/S4";
import S5 from "./Rails/S5";

function App() {
  const { selected, round } = React.useContext(Moving);
  const { cellSize, windowSize } = React.useContext(BoardTable);
  const {
    loggedIn,
    mode,
    page,
    loggedInHandler,
    modeHandler,
    baseURL,
    socket,
    userReady,
    changeUserStatus,
  } = React.useContext(LoginData);

  const [showPieces, setShowPieces] = React.useState(
    windowSize.x < 769 ? false : true
  );
  const Logout = () => {
    sessionStorage.removeItem("user");
    loggedInHandler(false);
    modeHandler("");
  };

  React.useEffect(() => {
    getUserStatusInfo();
  }, [page]);

  const getUserStatusInfo = () => {
    if (loggedIn && mode === "multiPlayer") {
      fetch(`${baseURL}userStatus.php`, {
        method: "post",
        body: JSON.stringify({
          code: JSON.parse(sessionStorage.getItem("user")).code,
          id: JSON.parse(sessionStorage.getItem("user")).id,
        }),
      })
        .then((data) => data.json())
        .then((data) => {
          if (data.status === "ok") {
            changeUserStatus(data.player);
          } else if (data.status === "failed to connect") {
            console.log("failed to connect");
          } else {
            console.log("something is wrong");
          }
        });
    }
  };

  return (
    <div className="App">
      {loggedIn || mode !== "" ? (
        ((page !== "game" || userReady === "ready") && userReady === "ready") ||
        page === "calculate" ? (
          <JoinPage />
        ) : (
          <>
            <Board />
            <div className="PiecesPlace">
              <div
                style={{
                  height:
                    windowSize.x < 769
                      ? `${windowSize.y * 0.2 - (cellSize + 10)}px`
                      : "70px",
                }}
              >
                <Controls />
              </div>
              <div
                className="PiecesHolder"
                style={{
                  height:
                    windowSize.x < 769
                      ? showPieces
                        ? "40vh"
                        : `${cellSize + 10}px`
                      : `${windowSize.y - 70}px`,
                  overflow: "hidden",
                }}
              >
                {windowSize.x < 769 ? (
                  <div className="ExpandBtn">
                    <div
                      className="ShowMore"
                      onClick={() => setShowPieces(!showPieces)}
                      style={{
                        width: `${windowSize.x * 0.8 - cellSize - 10}px`,
                        height: `${cellSize + 10}px`,
                        borderRadius: `${(cellSize + 10) / 2}px`,
                        background: showPieces
                          ? "rgb(0, 106, 255)"
                          : "rgb(255,255,255)",
                        fill: showPieces ? "#fff" : "rgb(0, 59, 143)",
                      }}
                    >
                      <div
                        className="icon"
                        style={{
                          transform: showPieces
                            ? "rotate(180deg)"
                            : "rotate(0)",
                        }}
                      >
                        <Expand />
                      </div>
                    </div>

                    {selected !== "" ? (
                      <div
                        className="ShowSelected"
                        style={{
                          transform: `rotate(${
                            selected.rotated * 90
                          }deg) rotateY(${selected.flip * 180}deg)`,
                          height: cellSize,
                        }}
                      >
                        {selected.name === "A0" ? (
                          <A0 />
                        ) : selected.name === "A1" ? (
                          <A1 />
                        ) : selected.name === "A2" ? (
                          <A2 />
                        ) : selected.name === "A3" ? (
                          <A3 />
                        ) : selected.name === "A4" ? (
                          <A4 />
                        ) : selected.name === "A5" ? (
                          <A5 />
                        ) : selected.name === "B0" ? (
                          <B0 />
                        ) : selected.name === "B1" ? (
                          <B1 />
                        ) : selected.name === "B2" ? (
                          <B2 />
                        ) : selected.name === "S0" ? (
                          <S0 />
                        ) : selected.name === "S1" ? (
                          <S1 />
                        ) : selected.name === "S2" ? (
                          <S2 />
                        ) : selected.name === "S3" ? (
                          <S3 />
                        ) : selected.name === "S4" ? (
                          <S4 />
                        ) : selected.name === "S5" ? (
                          <S5 />
                        ) : (
                          ""
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  ""
                )}

                <div
                  style={{
                    height:
                      windowSize.x < 769
                        ? `${windowSize.y * 0.4 - (cellSize + 10)}px`
                        : `100%`,
                    overflow: showPieces ? "auto" : "hidden",
                  }}
                >
                  <Specials />
                  <Normals />
                </div>
              </div>
            </div>
          </>
        )
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
