import "./App.css";
import { useState, useEffect } from "react";
import { gapi } from "gapi-script";
import GoogleLogin from "react-google-login";

function App() {
  const clientID =
    "155420643556-kumc4k1g46jq1bmoqqjavm5h9ltas5ok.apps.googleusercontent.com";
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const onSuccess = (response) => {
    setUser({
      ...response.profileObj,
      userId: response.googleId,
      email: response.profileObj.email,
    });
    setLoggedIn(true);
  };
  const onFailure = (response) => {
    console.log("Something went wrong");
  };
  const handleLogout = () => {
    setUser({});
    setLoggedIn(false);
  };
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientID,
      });
    }
    gapi.load("client:auth2", start);
  }, []);
  console.log(loggedIn, handleLogout);
  return (
    <div className="center">
      <h1>Login</h1>

      <div className="btn">
        <GoogleLogin
          clientId={clientID}
          onSuccess={onSuccess}
          onFailure={onFailure}
          buttonText="Continue with Google"
          cookiePolicy={"single_host_origin"}
        />
      </div>

      {loggedIn && (
        <div className="profile">
          <img src={user.imageUrl} alt="User Profile" />
          <h3>{user.name}</h3>
          <p>Email: {user.email}</p>
          <p>User ID: {user.userId}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default App;
