import React, { useState } from 'react';
import AddUser from './components/AddUser';
import Login from './components/Login';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import HomeScreen from './components/HomeScreen';
import Game from './components/Game';


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
    
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5" align="center" sx={{ marginTop: 2 }}>
      Saber y Ganar
      </Typography>
       <Router>
       <Switch>
        <Route path="/adduser" component={AddUser} />
        <Route path="/login" component={Login} />
        <Route path="/" component={Login} />
        <PrivateRoute path="/home" isAuthenticated={isAuthenticated} component={HomeScreen} />
        <PrivateRoute path="/game" isAuthenticated={isAuthenticated} component={Game} />
        </Switch>
    </Router>
    
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
const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

export default App;
