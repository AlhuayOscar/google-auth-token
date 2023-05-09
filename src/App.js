import logo from "./logo.svg";
import "./App.css";
import { gapi } from "gapi-script";
import GoogleLogin from "react-google-login";
import { useEffect } from "react";

function App() {
  const clientID =
    "155420643556-kumc4k1g46jq1bmoqqjavm5h9ltas5ok.apps.googleusercontent.com";
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

      <div class={user ? "profile" : "hidden"}>
        <img src={user.imageUrl} />
        <h3>{user.name}</h3>
      </div>
    </div>
  );
}

export default App;
