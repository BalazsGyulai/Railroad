import React, {useState} from "react";
import "./Login.css";

const Login = ({changeLogin}) => {
    const [username, setUsername] = useState("");
    const [code, setCode] = useState("");

    const UsernameHandler = (e) => {
        setUsername(e.target.value)
    }

    const CodeHandler = (e) => {
        setCode(e.target.value)
    }

    const StartHandler = () => {
        if (username !== ""){
            changeLogin();
        }
    }

  return (
    <div id="login">
      <div className="LoginInfos">
        <div className="InputHolder">
          <h1>Felhasználónév:</h1>
          <input type="text" value={username} onChange={UsernameHandler}/>
        </div>
        <div className="InputHolder">
          <h1>Játék kód:</h1>
          <input type="text" value={code} onChange={CodeHandler} />
        </div>
        <button onClick={StartHandler}>START</button>
      </div>
    </div>
  );
};

export default Login;
