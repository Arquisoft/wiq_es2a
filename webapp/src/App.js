import React, { useState } from 'react';
import AddUser from './components/AddUser';
import Login from './components/Login';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import HomeScreen from './components/HomeScreen';
import Game from './components/Game';
import Welcome from './components/Welcome';
import ImagenA from './LogoSaberYGanar.png'


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
    <Container component="main">
      <nav className="navbar navbar-light">
        <a className="navbar-brand" href="/">
          <img src={ImagenA} width="30" height="30" className="d-inline-block align-top" alt=""/>
          WIQ
        </a>
      </nav>
      <Typography component="h1" variant="h5" align="center" sx={{ marginTop: 2 }}>
      Saber y Ganar
      </Typography>
      <Routes>
        <Route path="/adduser" element={<AddUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Welcome />} />
        <Route path="/home" isAuthenticated={isAuthenticated} element={<HomeScreen />} />
        <Route path="/game" isAuthenticated={isAuthenticated} element={<Game />} />
      </Routes>
    
      {/* <CssBaseline />
      
      {showLogin ? <Login /> : <AddUser />}
      <Typography component="div" align="center" sx={{ marginTop: 2 }}>
        {showLogin ? (
          <Link name="gotoregister" component="button" variant="body2" onClick={handleToggleView}>
            Don't have an account? Register here.
          </Link>
        ) : (
          <Link component="button" variant="body2" onClick={handleToggleView}>
            Already have an account? Login here.
          </Link>
        )}
      </Typography> */}
    </Container>
  );

}

/* function PrivateRoute({ isAuthenticated, ...props }) {
  return isAuthenticated ? <Route {...props} /> : <Navigate to="/login" />;
} */

export default App;
