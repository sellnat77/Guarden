import React from "react";
import { Link } from "react-router-dom";

const ProfileButton = ({ token }) => {
  return (
    <Link to={`/profile?token=${token}`}>
      <button>Profile</button>
    </Link>
  );
};

export default ProfileButton;
