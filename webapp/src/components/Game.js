import React, { useState } from 'react';
import { Container, styled } from '@mui/system';
import Grid from '@mui/material/Grid';
import axios from 'axios';



const StyledContainer = styled(Container)({
    textAlign: 'center',
    marginTop: '2rem',
  });
  
  const StyledButton = styled('button')({

  padding: '10px 20px',
  cursor: 'pointer',


  });

  const apiEndpoint = 'http://localhost:8005';

  
  
  const Game = () => {
    const [error, setError] = useState('');
    const [pregunta, setPregunta] = useState('');
    const addPregunta = async () => {
    
      try {
        const p = await axios.post(`${apiEndpoint}/randomQuest`, { });
        setPregunta(p.data);
      } catch (error) {
        setError(error.response.data.error);
      }
    };
    addPregunta().then(console.log("hi" + pregunta) );
    return (
      <StyledContainer>
        <h1></h1>
        <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
        <StyledButton>1</StyledButton>
        </Grid>
        <Grid item xs={12} sm={6}>
        <StyledButton>2</StyledButton>
        </Grid>
        <Grid item xs={12} sm={6}>
        <StyledButton>3</StyledButton>
        </Grid>
        <Grid item xs={12} sm={6}>
        <StyledButton>4</StyledButton>
        </Grid>
        </Grid>
      </StyledContainer>
    );
  };

export default Game;