import React, { useState, useEffect } from "react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import Login from "./Components/login";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import { jwtDecode } from "jwt-decode";

function App() {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    console.log("1");
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
        <ProtectedRoutes token={accessToken} />
      </BrowserRouter>
    </div>
  );
}

export default App;
