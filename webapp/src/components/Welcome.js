import React, { useState } from 'react';
import AddUser from './AddUser';
import Login from './Login';
import './Welcome.css'
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
              <button onClick={handleLogin}>Login</button>
              <button onClick={handleSignUp}>SignUp</button>
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