import { createContext, useState, useEffect, useContext } from "react";

const LoginData = createContext();

export function LoginMange({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [mode, setMode] = useState("");
  const [page, setPage] = useState("join");
  const baseURL = "https://railroadink.gyulaibalazs.hu/";

  useEffect(() => {
    if (sessionStorage.getItem("user") !== null) {
      loggedInHandler(true);
      modeHandler("multiPlayer");
    }
  }, []);

  useEffect(() => {
    if (loggedIn && mode === "multiPlayer") {
      setInterval(() => {
        fetch(`${baseURL}page.php`, {
          method: "post",
          body: JSON.stringify({
            code: JSON.parse(sessionStorage.getItem("user")).code,
          }),
        })
          .then((data) => data.json())
          .then((data) => {
            if (data.status === "ok") {
              PageHandler(data.page.actpage);
            } else if (data.status === "failed to connect") {
              console.log("failed to connect");
            } else {
              console.log("something is wrong");
            }
          });
      }, 1000);
    }
  }, [loggedIn, mode]);

  const PageHandler = (val) => {
    setPage(val);
  };

  const loggedInHandler = (val) => {
    setLoggedIn(val);
  };

  const modeHandler = (val) => {
    setMode(val);
  };

  return (
    <LoginData.Provider
      value={{
        loggedIn,
        loggedInHandler,
        mode,
        baseURL,
        modeHandler,
        PageHandler,
        page,
      }}
    >
      {children}
    </LoginData.Provider>
  );
}

export default LoginData;
