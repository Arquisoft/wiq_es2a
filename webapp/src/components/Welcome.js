import React, { useState } from 'react';
import AddUser from './AddUser';
import Login from './Login';
import './Welcome.css'
import Typography from '@mui/material/Typography';

const HomeScreen = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);

    const handleLogin = () => {
        setShowLogin(true);
    };

    const handleSignUp = () => {
        setShowSignUp(true);
    };

    const renderButtons = () => {
        if (!showLogin && !showSignUp) {
          return (
            <>
              <Typography component="h1" variant="h5" align="center" sx={{ marginTop: 2 }}>
                Tu juego favorito de televisión, ¡ahora en tu ordenador!
              </Typography>
              <Typography component="h1" variant="h5" align="center" sx={{ marginTop: 2 }}>
                Accede a tu cuenta o registrarte para comenzar
              </Typography>
              <Typography component="h1" variant="h5" align="center" sx={{ marginTop: 2 }}>
              ↓↓↓
              </Typography>
              <br></br>
              <div className="px-3">
                <button type="button" className="btn btn-outline-primary btn-lg" onClick={handleLogin}>Login</button>
                <button type="button" className="btn btn-outline-primary btn-lg" onClick={handleSignUp}>SignUp</button>
              </div>
            </>
          );
        }
      };

    return (
        <div className="welcome-container">
            <div className="background-image"></div>
            <div className="button-container">
                {renderButtons()}
            </div>
            {showLogin && <Login />}
            {showSignUp && <AddUser />}
        </div>
    );
};

export default HomeScreen;