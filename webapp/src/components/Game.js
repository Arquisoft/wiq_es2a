import React, { useState } from 'react';
import { Container, styled } from '@mui/system';

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
        <StyledButton>1</StyledButton>
        <StyledButton>2</StyledButton>
        <StyledButton>3</StyledButton>
        <StyledButton>4</StyledButton>
      </StyledContainer>
    );
  };

export default Game;