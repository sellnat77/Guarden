import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header>
      <nav>
        <button onClick={() => navigate("/add-location")}>Add Location</button>
        <button onClick={() => navigate("/add-plant")}>Add Plant</button>
      </nav>
    </header>
  );
};

export default Header;
