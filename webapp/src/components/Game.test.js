import React from 'react';
import { render, screen,cleanup } from '@testing-library/react';
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
      pregunta: 'What is the capital of France?',
      correcta: 'Paris',
      incorrectas: ['London', 'Berlin', 'Madrid'],
    };
    mockAxios.onPost('http://localhost:8000/questions').reply(200, mockResponse);
  
    render(
    <BrowserRouter>
        <Game />
    </BrowserRouter>);

    await screen.findByText('What is the capital of France?');
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('London')).toBeInTheDocument();
    expect(screen.getByText('Berlin')).toBeInTheDocument();
    expect(screen.getByText('Madrid')).toBeInTheDocument();
  });
});