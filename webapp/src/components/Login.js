// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Snackbar } from '@mui/material';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

  const loginUser = async () => {
    try {
      const response = await axios.post(`${apiEndpoint}/login`, { username, password });

       // Extract data from the response
       const { token } = response.data;
       // Store the token in localStorage
      localStorage.setItem('token', token);

      setOpenSnackbar(true);
      navigate("/home");
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container component="main" sx={{ marginTop: 4 }}>
        <div>
          <Container maxWidth="xs" sx={{ marginTop: 4 }}>
          <Typography component="h1" variant="h5">
            Iniciar sesión
          </Typography>
          <TextField
            name="username"
            margin="normal"
            fullWidth
            label="Nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            name="password"
            margin="normal"
            fullWidth
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={loginUser}>
            Iniciar sesión
          </Button>
          
          <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} message="Inicio de sesión existoso" />
          {error && (
            <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')} message={`Error: ${error}`} />
          )}
          <br></br>
          <Link to="/adduser">
            ¿No tienes cuenta? Regístrate aquí.
          </Link>
          </Container>
        </div>

    </Container>
  );
};

export default Login;