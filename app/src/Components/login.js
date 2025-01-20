import React, { useState } from "react";
import { Grid2, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    console.log(`sent ${email} ${password}`);
    event.preventDefault();
    // Call API to login
    axios
      .post("http://localhost:5000/auth/login", { email, password })
      .then((response) => {
        console.log(response.data.access_token);
        if (response.data.access_token) {
          localStorage.setItem("accessToken", response.data.access_token);
          navigate("/home"); // Navigate to /home after successful login
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  return (
    <Grid2 container direction="column" alignItems="center" justify="center">
      <Grid2 item xs={12} style={{ padding: "20px" }}>
        <Typography variant="h4">Login</Typography>
      </Grid2>
      <Grid2 item xs={12}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          fullWidth
          required
          onKeyDown={handleKeyPress}
        />
      </Grid2>
      <Grid2 item xs={12} style={{ marginTop: "20px" }}>
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          fullWidth
          required
          onKeyDown={handleKeyPress}
        />
      </Grid2>
      <Grid2 item xs={12} style={{ marginTop: "30px" }}>
        <Button variant="contained" onClick={handleSubmit}>
          Login
        </Button>
      </Grid2>
    </Grid2>
  );
};

export default Login;
