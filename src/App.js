import "./App.css";
import { useState, useEffect } from "react";
import { gapi } from "gapi-script";
import GoogleLogin from "react-google-login";

function App() {
  const clientID =
    "155420643556-kumc4k1g46jq1bmoqqjavm5h9ltas5ok.apps.googleusercontent.com";
  const [user, setUser] = useState({});
  const [loggeIn, setLoggetInfo] = useState(false);

  const onSuccess = (response) => {
    setUser(response.profileObj);
    document.getElementsByClassName("btn").hidden = true;
  };
  const onFailure = (response) => {
    console.log("Something went wrong");
  };
  const handleLogout = () => {
    setUser({});
  };
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientID,
      });
    }
    gapi.load("client:auth2", start);
  });
  console.log(loggeIn, setLoggetInfo, handleLogout);
  return (
    <div className="center">
      <h1>Login</h1>

      <div className="btn">
        <GoogleLogin
          clientId={clientID}
          onSuccess={onSuccess}
          onFailure={onFailure}
          buttonText="Continue  with Google"
          cookiePolicy={"single_host_origin"}
        />
      </div>

      <div className={user ? "profile" : "hidden"}>
        <img src={user.imageUrl} alt="Se supone qué tengo foto en google" />
        <h3>{user.name}</h3>
      </div>
    </div>
  );
}

export default App;
