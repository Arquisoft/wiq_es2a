import React from 'react';
import { render, screen,cleanup, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Game from './Game';
import { BrowserRouter} from 'react-router-dom';
const jwt = require('jsonwebtoken');
const mockAxios = new MockAdapter(axios);

describe('Game', () => {
  beforeEach(() => {
    const token = jwt.sign({username: "testUsername" }, 'secret-key');
    localStorage.setItem('token', token);
  });

  afterEach(() => {
    localStorage.clear();
    mockAxios.reset();
    cleanup();
  });

  it('should load the word Cargando...', () => {
    render(
    <BrowserRouter>
        <Game />
    </BrowserRouter>);
    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });

  it('should mock the question and show it on the screen', async () => {
    const mockResponse = {
      pregunta: '¿Cual es la capital de Italia?',
      correcta: 'Roma',
      incorrectas: ['Seul', 'Berlin', 'Madrid'],
    };

    mockAxios.onPost('http://localhost:8000/questions').reply(200, mockResponse);
  
    render(
    <BrowserRouter>
        <Game />
    </BrowserRouter>);

    await screen.findByText('¿Cual es la capital de Italia?');
    expect(screen.getByText('Roma')).toBeInTheDocument();
    expect(screen.getByText('Seul')).toBeInTheDocument();
    expect(screen.getByText('Berlin')).toBeInTheDocument();
    expect(screen.getByText('Madrid')).toBeInTheDocument();
  });

  it('should select the correct answer and add 1 to the total', async () => {

    const mockResponse = {
      pregunta: '¿Cuál es la capital de Italia?',
      correcta: 'Roma',
      incorrectas: ['Seul', 'Berlin', 'Madrid'],
    };

    mockAxios.onPost(`http://localhost:8000/questions`).reply(200, mockResponse);

    const { getByText } = render(
      <BrowserRouter>
          <Game />
      </BrowserRouter>);

    // Esperar a que se cargue la pregunta
    await waitFor(() => expect(getByText(mockResponse.pregunta)).toBeInTheDocument());

    // Seleccionamos la respuesta correcta
    const correctOption = screen.getAllByRole('radio').find(option => option.parentElement.getAttribute('data-iscorrect') === 'true');
    fireEvent.click(correctOption);

    // Verificar que se incrementa la puntuación
    expect(getByText('Preguntas acertadas: 1')).toBeInTheDocument();
  });

  it('should select a incorrect answer and total is 0', async () => {

    const mockResponse = {
      pregunta: '¿Dónde se encuentra el monumento Torre Eiffel?',
      correcta: 'Francia',
      incorrectas: ['Japón', 'Alemania', 'Suiza'],
    };

    mockAxios.onPost(`http://localhost:8000/questions`).reply(200, mockResponse);

    const { getByText } = render(
      <BrowserRouter>
          <Game />
      </BrowserRouter>);

    // Esperar a que se cargue la pregunta
    await waitFor(() => expect(getByText(mockResponse.pregunta)).toBeInTheDocument());

    //Doy click a una incorrecta
    const incorrectButton = screen.getByText('Alemania');
    fireEvent.click(incorrectButton);

    // Verificar que la puntuación sigue en 0
    expect(getByText('Preguntas acertadas: 0')).toBeInTheDocument();
  });

  it('should finish a game and show the number of correct answers', async () => {
    localStorage.setItem('numQuestions', 1);
    const mockResponse = {
      pregunta: '¿Dónde se encuentra el monumento Torre Eiffel?',
      correcta: 'Francia',
      incorrectas: ['Japón', 'Alemania', 'Suiza'],
    };

    mockAxios.onPost(`http://localhost:8000/questions`).reply(200, mockResponse);

    const { getByText } = render(
      <BrowserRouter>
          <Game esperaFinalizacion={0}/>
      </BrowserRouter>);

    // Esperar a que se cargue la pregunta
    await waitFor(() => expect(getByText(mockResponse.pregunta)).toBeInTheDocument());

    //Doy click a la correcta
    const correcta = screen.getByText('Francia');
    fireEvent.click(correcta);

    expect(localStorage.getItem('numQuestions')).toBe("1");
    await waitFor(() => expect(getByText(/Has acertado 1\/1 preguntas/i)).toBeInTheDocument());

    mockAxios.onPost('http://localhost:8000/addRecord').reply(200, 
    { user_id: "testUsername",
      correctQuestions: 1,
      totalQuestions: 1,
      totalTime: 10});
    //Vuelvo al inicio
    const inicioButton = screen.getByText('Volver al inicio');
    fireEvent.click(inicioButton);
    expect(window.location.pathname).toBe('/');
  });
});