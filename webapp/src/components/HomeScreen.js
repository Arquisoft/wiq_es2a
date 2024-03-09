import React, { useState } from 'react';
import { Container} from '@mui/material';
const HomeScreen = () => {
    const [juegoIniciado, setJuegoIniciado] = useState(false);

    const handleStartButtonClick = () => {
        setJuegoIniciado(true);
    };
    return (
        <Container component="main">
        <div>
             {juegoIniciado ? (
            // Muestra otro componente o contenido cuando el juego está iniciado
            <div>
              <h1>¡El juego ha comenzado!</h1>
            
            </div>
          ) : (
            // Muestra el contenido inicial con el botón "Jugar"
            <div>
              <button onClick={handleStartButtonClick}>Jugar</button>
            </div>
          )}
        </div>
        </Container>
      )
};

export default HomeScreen;
  
