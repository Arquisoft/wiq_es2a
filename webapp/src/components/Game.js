import React, { useState } from 'react';
import { Container, styled } from '@mui/system';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { useEffect } from 'react';



const StyledContainer = styled(Container)({
    textAlign: 'center',
    marginTop: '2rem',
  });
  
  const StyledButton = styled('button')({

  padding: '10px 20px',
  cursor: 'pointer',


  });

  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';
  
  

  
  
  const Game = () => {
    const [textoPregunta, setTextoPregunta] = useState('Pregunta');
    const [textoBoton1, setTextoBoton1] = useState('Placeholder');
    const [textoBoton2, setTextoBoton2] = useState('Placeholder');
    const [textoBoton3, setTextoBoton3] = useState('Placeholder');
    const [textoBoton4, setTextoBoton4] = useState('Placeholder');
    const [error, setError] = useState('');

    const addPregunta = async () => {
      try {
        const response = await axios.post(`${apiEndpoint}/questions`, { });
        setTextoPregunta(response.data.pregunta)    
        setTextoBoton1(response.data.correcta)
        setTextoBoton2(response.data.incorrectas[0])
        setTextoBoton3(response.data.incorrectas[1])
        setTextoBoton4(response.data.incorrectas[2])
 
      } catch (error) {
        console.log(error.response.data.error);
      }
    };

    // useEffect(() => {
    //   console.log('El componente se ha montado');
    //   addPregunta().then(console.log("hi" + pregunta) );
    // }, [])
    
    return (
      <StyledContainer>
        <h1>{textoPregunta}</h1>
        <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
        <StyledButton onClick={addPregunta}>{textoBoton1} </StyledButton>
        </Grid>
        <Grid item xs={12} sm={6}>
        <StyledButton>{textoBoton2} </StyledButton>
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