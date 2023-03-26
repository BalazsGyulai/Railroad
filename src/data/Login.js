import { createContext, useState, useEffect, useContext } from "react";

const LoginData = createContext();

export function LoginMange({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [mode, setMode] = useState("");
  const [page, setPage] = useState("join");
  const baseURL = "http://localhost/";

  useEffect(() => {
    if (sessionStorage.getItem("user") !== null){
        loggedInHandler(true);
        modeHandler("multiPlayer");
    }
  }, []);

  const PageHandler = (val) => {
    setPage(val)
  }

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
        page
      }}
    >
      {children}
    </LoginData.Provider>
  );
}

export default LoginData;
