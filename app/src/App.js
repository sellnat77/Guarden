import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Login from "./Components/login";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import { jwtDecode } from "jwt-decode";

function App() {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");

    if (storedAccessToken) {
      let decodedToken = jwtDecode(storedAccessToken);
      console.log("Decoded Token", decodedToken);
      let currentDate = new Date();

      let tokenExpired = true;
      if (decodedToken.exp * 1000 >= currentDate.getTime()) {
        tokenExpired = false;
      }

      if (tokenExpired) {
        console.log(`Clearing expired token ${storedAccessToken}`);
        localStorage.removeItem("accessToken");
      } else {
        console.log(`Found token ${storedAccessToken}`);
        setAccessToken(storedAccessToken);
      }
    }
  }, []);

  return (
    <div>
      <BrowserRouter>
        {accessToken ? (
          // User is logged in, show protected routes
          <div>
            <ProtectedRoutes token={accessToken} />
          </div>
        ) : (
          // User is not logged in, show login form
          <Login />
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
