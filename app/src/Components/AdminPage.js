// AdminPage.js
import React, { useState } from "react";
import axios from "axios";

const AdminPage = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleUpdateUsername = async () => {
    try {
      await axios.put("/api/users/me", { username });
      // Update local storage with new username
      localStorage.setItem("username", username);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <form>
        <label>Username:</label>
        <input type="text" value={username} onChange={handleUsernameChange} />
        <br />
        {error && <div style={{ color: "red" }}>{error}</div>}
        <button onClick={handleUpdateUsername}>Update Username</button>
      </form>
    </div>
  );
};

export default AdminPage;
