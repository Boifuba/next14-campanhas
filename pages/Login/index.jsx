import React from "react";
import { GoogleLogin } from "react-google-login";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../api/firebase"; // Import the Firebase app

function LoginPage() {
  const auth = getAuth(app);

  const responseGoogle = (response) => {
    console.log(response);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out");
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <div>
      <h1>Login Page</h1>
      <GoogleLogin
        clientId="315668909720-l4eo2kleccfqtmig9ijtc766jibhedc3.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default LoginPage;
