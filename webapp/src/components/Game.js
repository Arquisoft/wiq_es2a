import React, { useState } from 'react';
import { Container, styled } from '@mui/system';
import Grid from '@mui/material/Grid';

const StyledContainer = styled(Container)({
    textAlign: 'center',
    marginTop: '2rem',
  });
  
  const StyledButton = styled('button')({

  padding: '10px 20px',
  cursor: 'pointer',


  });
  
  const Game = () => {
    const [textoPregunta, setTextoPregunta] = useState('Pregunta');
    const [textoBoton1, setTextoBoton1] = useState('Placeholder');
    const [textoBoton2, setTextoBoton2] = useState('Placeholder');
    const [textoBoton3, setTextoBoton3] = useState('Placeholder');
    const [textoBoton4, setTextoBoton4] = useState('Placeholder');



    const cambiarTextoBoton1 = () => {
      setTextoBoton1('Prueba'); // Aquí iria la llamada a la función de preguntas
    };

    const cambiarTextoBoton2 = () => {
      setTextoBoton2('Prueba'); // Aquí iria la llamada a la función de preguntas
    };

    const cambiarTextoBoton3 = () => {
      setTextoBoton3('Prueba'); // Aquí iria la llamada a la función de preguntas
    };

    const cambiarTextoBoton4 = () => {
      setTextoBoton4('Prueba'); // Aquí iria la llamada a la función de preguntas
    };

    const cambiarTextoPregunta = () => {
      setTextoPregunta('Prueba2'); // Llamada a la función
    }

    return (
      <StyledContainer>
        <h1>{textoPregunta}</h1>
        <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
        <StyledButton>{textoBoton1}</StyledButton>
        </Grid>
        <Grid item xs={12} sm={6}>
        <StyledButton>{textoBoton2}</StyledButton>
        </Grid>
        <Grid item xs={12} sm={6}>
        <StyledButton>{textoBoton3}</StyledButton>
        </Grid>
        <Grid item xs={12} sm={6}>
        <StyledButton>{textoBoton4}</StyledButton>
        </Grid>
        </Grid>
      </StyledContainer>
    );
  };

export default Game;
