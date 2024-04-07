import React, { useState } from 'react';
import AddUser from './components/AddUser';
import Login from './components/Login';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import HomeScreen from './components/HomeScreen';
import Game from './components/Game';
import Welcome from './components/Welcome';
import ImagenA from './LogoSaberYGanar2.png';
import History from './components/History.js';
import './App.css';


function App() {
  const [showLogin, setShowLogin] = useState(true);

  const handleToggleView = () => {
    setShowLogin(!showLogin);
  };
  const [isAuthenticated, setAuthenticated] = useState(false);

  const handleLogin = () => {
    // Lógica para autenticar al usuario (por ejemplo, verificar credenciales)
    setAuthenticated(true);
  };

  return (
    <div>
    <nav className="navbar navbar-light m-auto" >
        <a className="navbar-brand m-auto" href="/">
          <img src={ImagenA} width="100" height="56" className="d-inline-block align-top" alt=""/>
        </a>
    </nav>
      
    <Container component="main" id="principal">
      <Routes>
        <Route path="/adduser" element={<AddUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Welcome />} />
        <Route path="/home" isAuthenticated={isAuthenticated} element={<HomeScreen />} />
        <Route path="/game" isAuthenticated={isAuthenticated} element={<Game />} />
        <Route path="/history" element={<History />} />
      </Routes>
    
      {}
    </Container>
    </div>
  );

}

/* function PrivateRoute({ isAuthenticated, ...props }) {
  return isAuthenticated ? <Route {...props} /> : <Navigate to="/login" />;
} */

export default App;