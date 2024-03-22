import React, { useState } from 'react';
import { Container, styled } from '@mui/system';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { useEffect } from 'react';

function Respuesta({ value, iscorrect, onPClick }) {
  return (
    <StyledButton className="pregunta" data-iscorrect={iscorrect} onClick={onPClick}>
      {value}
    </StyledButton>
  );
}

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
    const [respuestas, setRespuestas] = useState(Array(4).fill({data:'', isCorrect:''}));
    const [textoPregunta, setTextoPregunta] = useState('Cargando...');
    const [error, setError] = useState('');

    const addPregunta = async () => {
      try {
        const random = Math.floor(Math.random() * 4);
        const response = await axios.post(`${apiEndpoint}/questions`, { });
        setTextoPregunta(response.data.pregunta)
        for (let i = 0; i < respuestas.length; i++) {
          let cont=0;
          if(i!=random){
            const resp1=respuestas.slice();
            resp1[i]={data:response.data.incorrectas[cont], isCorrect:false};
            cont++;
            setRespuestas(resp1);
          }else{
            const resp1=respuestas.slice();
            resp1[i]={data:response.data.correcta, isCorrect:true};
            setRespuestas(resp1);
          }
        }
 
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
          <Respuesta value={respuestas[0].data} onPClick={addPregunta} data-iscorrect={respuestas[0].isCorrect}></Respuesta>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Respuesta value={respuestas[1].data} onPClick={addPregunta} data-iscorrect={respuestas[1].isCorrect}></Respuesta>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Respuesta value={respuestas[2].data} onPClick={addPregunta} data-iscorrect={respuestas[2].isCorrect}></Respuesta>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Respuesta value={respuestas[3].data} onPClick={addPregunta} data-iscorrect={respuestas[3].isCorrect}></Respuesta>
        </Grid>
        </Grid>
      </StyledContainer>
    );
  };

export default Game;