// ProtectedRoutes.js
import { Route, Routes, useNavigate } from "react-router-dom";
import AdminPage from "./AdminPage";
import Home from "./Home";
import Location from "./Location";

const ProtectedRoutes = ({ token }) => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    // User is not logged in, redirect to login page
    navigate("/login");
  }

  return (
    <div>
      <Routes>
        <Route path="/location" element={<Location token={token} />} />
        <Route path="/home" element={<Home token={token} />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </div>
  );
};

export default ProtectedRoutes;
