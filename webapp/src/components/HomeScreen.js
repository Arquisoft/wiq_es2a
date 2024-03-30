import React, { useState } from 'react';
import { Container} from '@mui/material';
import Game from './Game';
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
            <div>
              <button onClick={handleStartButtonClick}>Jugar</button>
              <div className="form-outline" style={{width: "5em"}}>
                <input value={defecto} type="number" id="typeNumber" className="form-control" onChange={changeNumber} />
              </div>
              <br></br>
              <button>Ver historial</button>
            </div>
          )}
        </div>
        </Container>
      )
};

export default HomeScreen;
  
