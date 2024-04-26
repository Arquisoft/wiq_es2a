import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Game from './Game';
import { BrowserRouter} from 'react-router-dom';

describe('Game', () => {
  let mockAxios;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('should render the loading text initially', () => {
    render(
    <BrowserRouter>
        <Game />
    </BrowserRouter>);
    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });

  it('should render the question and answer options after loading', async () => {
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
    await waitFor(() => expect(screen.queryByText('Cargando...')).not.toBeInTheDocument());

    await screen.findByText('What is the capital of France?');
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('London')).toBeInTheDocument();
    expect(screen.getByText('Berlin')).toBeInTheDocument();
    expect(screen.getByText('Madrid')).toBeInTheDocument();
  });
});