import { createContext, useState, useEffect, useContext } from "react";
import io from "socket.io-client";

const LoginData = createContext();

export function LoginMange({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [mode, setMode] = useState("");
  const [page, setPage] = useState("join");
  // const baseURL = "http://railroadink.gyulaibalazs.hu/";
  const baseURL = "http://localhost/php/";
  const [socket, setSocket] = useState(
    io.connect("http://localhost:4000", {
      autoConnect: false,
    })
  );

  useEffect(() => {
    if (sessionStorage.getItem("user") !== null) {
      loggedInHandler(true);
      modeHandler("multiPlayer");

      FetchPage();
    }
  }, []);

  useEffect(() => {
    if (loggedIn && mode === "multiPlayer") {
      socket.connect();
      socket.emit("join", {
        userName: JSON.parse(sessionStorage.getItem("user")).username,
        group: JSON.parse(sessionStorage.getItem("user")).code,
      });
      FetchPage();
    }
  }, [loggedIn, mode]);

  const FetchPage = async () => {
    socket.on("pageChanged", (msg) => {
      PageHandler(msg);
    });

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
  };

  const SocketupgradePage = (newPage) => {
    socket.emit("changePage", {
      group: JSON.parse(sessionStorage.getItem("user")).code,
      page: newPage,
    });
  };

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
        socket,
        SocketupgradePage,
      }}
    >
      {children}
    </LoginData.Provider>
  );
}

export default LoginData;
