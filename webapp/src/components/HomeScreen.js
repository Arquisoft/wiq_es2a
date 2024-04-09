import React, { useState,useEffect } from 'react';
import { Container} from '@mui/material';
import Game from './Game';
import './HomeScreen.css';
import { useNavigate } from "react-router-dom";

const HomeScreen = () => {
    const [defecto, setDefecto] = useState("15");

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleStartButtonClick = () => {
      localStorage.setItem('numQuestions', defecto);
      navigate("/game");
    };

    const changeNumber = (event) => {
      setDefecto(event.target.value);
    };

    const handleHistoryButton = () => {
      navigate("/history");
    }
    const checkUserLogin = () => {
      if (token==null) {
        navigate("/");
      }
    }
    
  useEffect(() => {
    checkUserLogin();
  }, [])

    return (
        <Container component="main">
        <div>
            <div id = "home">
              <div className="form-outline" >
                <label className="form-label" htmlFor="typeNumber">Número de preguntas:</label>
                <input min="1" max="30" value={defecto} type="number" id="typeNumber" className="form-control" onChange={changeNumber}/>
              </div>
              <button onClick={handleStartButtonClick} type="button" className="btn btn-outline-primary btn-lg">Jugar</button>
              <button  onClick={handleHistoryButton} type="button" className="btn btn-outline-primary btn-lg">Ver historial</button>
            </div>
        </div>
        </Container>
      )
};

export default HomeScreen;
  
