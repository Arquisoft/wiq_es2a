import React, { useState } from 'react';
import { Container, styled } from '@mui/system';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { useEffect } from 'react';
import './Game.css';

const StyledContainer = styled(Container)({
  textAlign: 'center',
  marginTop: '2rem',
});

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';


const Game = () => {
  const [respuestas, setRespuestas] = useState(Array(4).fill({ data: '', isCorrect: '' }));
  const [textoPregunta, setTextoPregunta] = useState('Cargando...');
  const [preguntasAcertadas, setPreguntasAcertadas] = useState(0);
  const [error, setError] = useState('');

  /**
   * Este método comprueba si la pregunta es correcta y deshabilita los botones hasta que
   * no salga la siguiente pregunta para evitar errores
   * @param {*} e 
   */
  const checkPregunta = async (e) => {
    //Si ha acertado añade al contador de aciertos una más
    const isCorrect = e.target.parentNode.getAttribute('data-iscorrect') === 'true';
    if (isCorrect) {
      setPreguntasAcertadas(preguntasAcertadas + 1);
    }

    const old = e.target.parentNode.getAttribute('class');
    e.target.parentNode.setAttribute('class', old + " active");

    const c = document.querySelector('[data-iscorrect=true]');
    if (c != null) {
      c.setAttribute('class', old + " active");
    }


    //Selección de todos los inputs y deshabilitarlos
    const inputs = document.querySelectorAll('input[name="options"]');
    inputs.forEach(input => {
      input.disabled = true;
    });

    //Tras 3 segundos llama a la función de addPregunta par que de tiempo a ver el resultado
    setTimeout(addPregunta, 3000, e);
  }

  /**
   * Este método crea la nueva pregunta llamando al Post (y recogiendo datos de wikidata)
   * También se asegura de poner los inputs de la respuesta sin active, además de volverlos a habilitar
   * @param {} e 
   */
  const addPregunta = async (e) => {
    try {
      //Se selecciona un número aleatorio [0,3] que será el lugar de la respuesta correcta
      const random = Math.floor(Math.random() * 4);

      //Llamada al post para obtener los resultados de Wikidata
      const response = await axios.post(`${apiEndpoint}/questions`, {});

      //Borrado active de la anterior pregunta y habilitar botones de nuevo
      const inputs = document.querySelectorAll('input[name="options"]');
      inputs.forEach(input => {
        input.disabled = false;
      });
      const activos = document.querySelectorAll('.active');
      if (activos != null) {
        for (let i = 0; i < activos.length; i++) {
          activos[i].classList.remove('active');
        }
      }
      //Fin de borrado

      //Introducción del texto en los input de la respuesta
      setTextoPregunta(response.data.pregunta)
      console.log(random + " Correcta " + response.data.correcta);

      let respCopia = respuestas.slice();
      respCopia[random] = { data: response.data.correcta, isCorrect: true };
      let cont = 0;
      for (let i = 0; i < respuestas.length; i++) {
        if (i != random) {
          respCopia[i] = { data: response.data.incorrectas[cont], isCorrect: false };
          console.log("incorrecta " + respCopia[i].data);
          cont++;
        }
      }
      setRespuestas(respCopia);

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
      <div className="btn-group btn-group-toggle" data-toggle="buttons">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <label className="btn btn-secondary" data-iscorrect={respuestas[0].isCorrect}>
              <input type="radio" name="options" id="option1" autoComplete="off" onClick={checkPregunta} /> {respuestas[0].data}
            </label>
          </Grid>
          <Grid item xs={12} sm={6}>
            <label className="btn btn-secondary" data-iscorrect={respuestas[1].isCorrect}>
              <input type="radio" name="options" id="option2" autoComplete="off" onClick={checkPregunta} /> {respuestas[1].data}
            </label>
          </Grid>
          <Grid item xs={12} sm={6}>
            <label className="btn btn-secondary" data-iscorrect={respuestas[2].isCorrect}>
              <input type="radio" name="options" id="option3" autoComplete="off" onClick={checkPregunta} /> {respuestas[2].data}
            </label>
          </Grid>
          <Grid item xs={12} sm={6}>
            <label className="btn btn-secondary" data-iscorrect={respuestas[3].isCorrect}>
              <input type="radio" name="options" id="option4" autoComplete="off" onClick={checkPregunta} /> {respuestas[3].data}
            </label>
          </Grid>
        </Grid>
      </div>
      <p>Preguntas acertadas: {preguntasAcertadas}</p>
    </StyledContainer>
  );
};

export default Game;