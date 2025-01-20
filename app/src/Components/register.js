import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@material-ui/core';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/users', { username, email, password });
      const accessToken = response.data.accessToken;
      localStorage.setItem('accessToken', accessToken);
      // Redirect to dashboard or main app
      window.location.href = '/';
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography variant="h5">Register</Typography>
      <form onSubmit={handleRegister}>
        <TextField
          label="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          fullWidth
        />
        <TextField
          label="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          fullWidth
        />
        {error && (
          <Typography color="error" gutterBottom>
            {error}
          </Typography>
        )}
        <Button type="submit" variant="contained">
          Register
        </Button>
      </form>
    </Container>
  );
};

export default Register;
