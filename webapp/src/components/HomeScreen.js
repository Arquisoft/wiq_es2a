import React, { useState } from 'react';
import { Container} from '@mui/material';
import Game from './Game';
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
            <Game />
          ) : (
            // Muestra el contenido inicial con el botón "Jugar"
            <div>
              <button onClick={handleStartButtonClick}>Jugar</button>
              <br></br>
              <button>Ver historial</button>
            </div>
          )}
        </div>
        </Container>
      )
};

export default HomeScreen;
