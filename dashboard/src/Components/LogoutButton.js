import React from "react";

const LogoutButton = () => {
  const handleClick = () => {
    // Example: Clearing local storage and navigating to login page
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
  };

  return <button onClick={handleClick}>Logout</button>;
};

export default LogoutButton;
