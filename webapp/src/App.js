
import AddUser from './components/AddUser';
import Login from './components/Login';
import Container from '@mui/material/Container';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import HomeScreen from './components/HomeScreen';
import Game from './components/Game';
import Welcome from './components/Welcome';
import ImagenA from './LogoSaberYGanar2.png';
import History from './components/History.js';
import './App.css';
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const logout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('numQuestions');
      //document.getElementById('btLogout').style.display = 'none';
      navigate("/");
  };

  const volverHome = () => {
    if (token!=null) {
      navigate("/home");
    }
    else {
      navigate("/");
    }
  };

  return (
    <div>
    <nav className="navbar navbar-light m-auto">
        <button  type="button" onClick={volverHome} id="btSaberYGanar">
          <img src={ImagenA}  alt="Logo Saber y Ganar" />
        </button>

        <div className="navbar-right">
            <button id="btLogout" className="btn btn-dark" onClick={logout}>Cerrar sesión</button>
        </div>
    </nav>
      
    <Container component="main" id="principal">
      <Routes>
        <Route path="/adduser" element={<AddUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/game" element={<Game />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Container>
    </div>
  );

}

/* function PrivateRoute({ isAuthenticated, ...props }) {
  return isAuthenticated ? <Route {...props} /> : <Navigate to="/login" />;
} */

export default App;
