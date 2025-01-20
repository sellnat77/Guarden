import React from "react";
import { Link } from "react-router-dom";

const SettingsButton = ({ token }) => {
  return (
    <Link to={`/settings?token=${token}`}>
      <button>Settings</button>
    </Link>
  );
};

export default SettingsButton;
