import React, { useState, useRef } from 'react';
import { Container, styled } from '@mui/system';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { useEffect } from 'react';
import './Game.css';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const StyledContainer = styled(Container)({
  textAlign: 'center',
  marginTop: '2rem',
});

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';


const Game = ({ esperaFinalizacion = 3000 }) => {
  const [respuestas, setRespuestas] = useState(Array(4).fill({ data: '', isCorrect: '' }));
  const [textoPregunta, setTextoPregunta] = useState('Cargando...');
  const [preguntasAcertadas, setPreguntasAcertadas] = useState(0);
  const [contadorGlobal, setContadorGlobal] = useState(30);
  const [numPreguntas, setnumPreguntas]=useState(0);
  const [finished, setFinished] = useState(false);
  const [tiempoTotal, setTiempoTotal] = useState(0);
  var tiempoInicial = 0;
  var tiempoFinal = 0;

  const navigate = useNavigate();

  const numQuestions = localStorage.getItem('numQuestions');

  // Función para iniciar el tiempo
  const startTime = () => {
    tiempoInicial = new Date();
  };

  // Función para detener el tiempo
  const calculateTime = () => {
    tiempoFinal = new Date();
    tiempoFinal = tiempoFinal - tiempoInicial;
    setTiempoTotal(Math.floor(((tiempoFinal % 3600000) % 60000) / 1000));
  };


  const width = `${(contadorGlobal / 30) * 100}%`;

  const contadorIntervalRef = useRef(null);



  // Función para detener el contador
  const detenerContador = () => {
    clearInterval(contadorIntervalRef.current);
  };

  useEffect(() => {
    if (contadorGlobal === 0) {
      checkPregunta();
    }
  }, [contadorGlobal]);

  /**
   * Este método comprueba si la pregunta es correcta y deshabilita los botones hasta que
   * no salga la siguiente pregunta para evitar errores
   * @param {*} e 
   */
  const checkPregunta = async (e) => {
    detenerContador();
    if (e != null) {


      //Si ha acertado añade al contador de aciertos una más
      const isCorrect = e.target.parentNode.getAttribute('data-iscorrect') === 'true';
      if (isCorrect) {
        setPreguntasAcertadas(preguntasAcertadas + 1);
      }

      const old = e.target.parentNode.getAttribute('class');
      e.target.parentNode.setAttribute('class', old + " active");
    }
    const c = document.querySelector('[data-iscorrect=true]');
    if (c != null) {
      c.setAttribute('class', c.getAttribute('class') + " active");
    }


    //Selección de todos los inputs y deshabilitarlos
    const inputs = document.querySelectorAll('input[name="options"]');
    inputs.forEach(input => {
      input.disabled = true;
    });
    if(numPreguntas==numQuestions){
      setTimeout(addPregunta, esperaFinalizacion); //esperar un poco para que se vean los resultados de la ultima pregunta
    }
    else {
      addPregunta();
    }
      
  }

  /**
   * Este método crea la nueva pregunta llamando al Post (y recogiendo datos de wikidata)
   * También se asegura de poner los inputs de la respuesta sin active, además de volverlos a habilitar
   */
  const addPregunta = async () => {
    if(numPreguntas==numQuestions){
      calculateTime();
      setFinished(true);
    } else {
    try {
      clearInterval(contadorIntervalRef.current);
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
      setTextoPregunta(response.data.pregunta);

      let respCopia = respuestas.slice();
      respCopia[random] = { data: response.data.correcta, isCorrect: true };
      let cont = 0;
      for (let i = 0; i < respuestas.length; i++) {
        if (i != random) {
          respCopia[i] = { data: response.data.incorrectas[cont], isCorrect: false };
          cont++;
        }
      }
      setRespuestas(respCopia);
      if (numPreguntas==0) {
       startTime(); //inicio el tiempo una vez se vea la primera pregunta
      }
      // Reiniciar el contador a 30
      setContadorGlobal(30);

      // Volver a iniciar el intervalo del contador
      contadorIntervalRef.current = setInterval(() => {
        setContadorGlobal((prevCount) => {
          if (prevCount === 0) {
            checkPregunta(); // Si el contador llega a 0, realizar la acción correspondiente
            return prevCount; // Mantener el contador en 0
          } else {
            return prevCount - 1; // Decrementar el contador
          }
        });
      }, 1000); // Actualiza el contador cada segundo

      //Número de pregunta actual
      const n=numPreguntas;
      setnumPreguntas(n+1);

    } catch (error) {
      
    }
  }
  };

  const addRecord = async () => {
    try {
       // Obtén el token del almacenamiento local
      let token = localStorage.getItem('token');

      // Decodifica el token para obtener la información del usuario
      let decoded = jwtDecode(token);

      // Accede al nombre de usuario desde la información decodificada
      let username = decoded.username;
      //Llamada al post para obtener los resultados de Wikidata
      await axios.post(`${apiEndpoint}/addRecord`, {
        user_id: username,
        correctQuestions: preguntasAcertadas,
        totalQuestions: numPreguntas,
        totalTime: tiempoTotal
      });

      navigate("/home");

    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  const checkUserLogin = () => {
    let token = localStorage.getItem('token');
    if (token==null) {
      navigate("/");
    }
    else {
      if (numQuestions==null) {
        localStorage.setItem('numQuestions', 10);
      }
      addPregunta();
    }
  }

  useEffect(() => {
    checkUserLogin();
  }, [])

  return (
    <Container component="main" id="gameContainer" sx={{ marginTop: 4 }}>
    {finished ? (

      <div align="center">
        <h1> Has acertado {preguntasAcertadas}/{numQuestions} preguntas en {tiempoTotal} segundos</h1>
        <button type="button" className="btn btn-outline-primary btn-lg" onClick={addRecord}>Volver al inicio</button>
      </div>
      
    ) : (
    <StyledContainer>
      {numPreguntas > 0 && (
        <div>
          <h1 style={{ textAlign: 'left' }}>Pregunta Nº{numPreguntas}</h1>
          <div className="progress">
            <div className="progress-bar progress-bar-striped progress-bar-animated bg-info" role="progressbar" aria-valuenow={contadorGlobal} aria-valuemin="0" aria-valuemax="100" style={{width}}>{contadorGlobal}</div>
          </div>
        </div>
      )}
      
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
    )}
    </Container>
  );
};

export default Game;