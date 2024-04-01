import React, { useState } from 'react';
import { Container} from '@mui/material';
import Game from './Game';
import './HomeScreen.css';
const HomeScreen = () => {
    const [juegoIniciado, setJuegoIniciado] = useState(false);
    const [defecto, setDefecto] = useState("15");

    const handleStartButtonClick = () => {
        setJuegoIniciado(true);
    };

    const changeNumber = (event) => {
      setDefecto(event.target.value);
    };


    return (
        <Container component="main">
        <div>
             {juegoIniciado ? (
            // Muestra otro componente o contenido cuando el juego está iniciado
            <Game numQuestions={defecto}/>
          ) : (
            // Muestra el contenido inicial con el botón "Jugar"
            <div id = "home">
              <div className="form-outline" >
                <label className="form-label" htmlFor="typeNumber">Número de preguntas:</label>
                <input min="1" max="30" value={defecto} type="number" id="typeNumber" className="form-control" onChange={changeNumber}/>
              </div>
              <button onClick={handleStartButtonClick}>Jugar</button>
              <button>Ver historial</button>
            </div>
          )}
        </div>
        </Container>
      )
};

export default HomeScreen;
  
