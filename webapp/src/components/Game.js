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
    return (
      <StyledContainer>
        <h1>Pregunta</h1>
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