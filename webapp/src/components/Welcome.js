import './Welcome.css'
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
const HomeScreen = () => {
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate("/login");
    };

    const handleSignUp = () => {
        navigate("/adduser");
    };

    const renderButtons = () => {
          return (
            <>
              <Typography component="h1" variant="h5" align="center" sx={{ marginTop: 2 }}>
                Tu juego favorito de televisión, ¡ahora en tu ordenador!
              </Typography>
              <Typography component="h1" variant="h5" align="center" sx={{ marginTop: 2 }}>
                Accede a tu cuenta o regístrate para comenzar
              </Typography>
              <Typography component="h1" variant="h5" align="center" sx={{ marginTop: 2 }}>
              ↓↓↓
              </Typography>
              <br></br>
              <div className="d-flex justify-content-center">
                  <div className="px-2">
                      <button type="button" className="btn btn-outline-primary btn-lg" onClick={handleLogin}>Login</button>
                  </div>
                  <div className="px-2">
                      <button type="button" className="btn btn-outline-primary btn-lg" onClick={handleSignUp}>SignUp</button>
                  </div>
              </div>
            </>
          );
        
      };

    return (
        <div className="welcome-container">
            <div className="background-image"></div>
            <div className="button-container">
                {renderButtons()}
            </div>
        </div>
    );
};

export default HomeScreen;