import React, { useState } from 'react';
import { Container} from '@mui/material';
import Game from './Game';
import './HomeScreen.css';
import { Link } from "react-router-dom";

const HomeScreen = () => {
    const [mostrarJuego, setMostrarJuego] = useState(false);
    const [defecto, setDefecto] = useState("15");

    const handleStartButtonClick = () => {
      setMostrarJuego(true);
    };

    const changeNumber = (event) => {
      setDefecto(event.target.value);
    };

    const handleHistoryButton = () => {
      window.location.href = '/history';
    }

    return (
        <Container component="main">
        <div>
             {mostrarJuego ? (
            // Muestra otro componente o contenido cuando el juego está iniciado
            <Game numQuestions={defecto}/>
          ) : (
            // Muestra el contenido inicial con el botón "Jugar"
            <div id = "home">
              <div className="form-outline" >
                <label className="form-label" htmlFor="typeNumber">Número de preguntas:</label>
                <input min="1" max="30" value={defecto} type="number" id="typeNumber" className="form-control" onChange={changeNumber}/>
              </div>
              <button onClick={handleStartButtonClick} type="button" class="btn btn-outline-primary">Jugar</button>
              <button  onClick={handleHistoryButton} type="button" class="btn btn-outline-primary">Ver historial</button>
            </div>
          )}
        </div>
        </Container>
      )
};

export default HomeScreen;
  