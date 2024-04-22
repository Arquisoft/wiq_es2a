import React from 'react';
import { render,fireEvent, screen,cleanup, waitFor } from '@testing-library/react';
import History from './History';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
const mockAxios = new MockAdapter(axios);
const jwt = require('jsonwebtoken');

describe('History Component', () => {
    beforeEach(() => {
        localStorage.clear();
        mockAxios.reset();
        cleanup();
      });

  it('renders history table correctly', async () => {

    const token = jwt.sign({username: "testUsername" }, 'secret-key');
    localStorage.setItem('token', token);
    const mockHistoryData = [
      {
        _id: '1',
        correctQuestions: 8,
        totalQuestions: 10,
        totalTime: 120,
        doneAt: '2022-01-01T00:00:00Z',
      },
      {
        _id: '2',
        correctQuestions: 6,
        totalQuestions: 12,
        totalTime: 90,
        doneAt: '2022-01-02T00:00:00Z',
      },
    ];

    mockAxios.onPost('http://localhost:8000/getRecords').reply(200, mockHistoryData);

    render( 
      <BrowserRouter>
        <History historyData={mockHistoryData}/>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Historial de partidas')).toBeInTheDocument();
      expect(screen.getByText('Preguntas acertadas')).toBeInTheDocument();
      expect(screen.getByText('Nº preguntas')).toBeInTheDocument();
      expect(screen.getByText('Tiempo total')).toBeInTheDocument();
      expect(screen.getByText('Fecha')).toBeInTheDocument();

      expect(screen.getByText('8')).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument();
      expect(screen.getByText('120 segundos')).toBeInTheDocument();
      expect(screen.getByText('1/1/2022, 1:00:00')).toBeInTheDocument();

      expect(screen.getByText('6')).toBeInTheDocument();
      expect(screen.getByText('12')).toBeInTheDocument();
      expect(screen.getByText('90 segundos')).toBeInTheDocument();
      expect(screen.getByText('2/1/2022, 1:00:00')).toBeInTheDocument();
    });
  });

  it('button back goes to home', async () => {
    render( 
      <BrowserRouter>
        <History/>
      </BrowserRouter>
    );

    const backButton = screen.getByRole('button', { name: /Volver/i });
    fireEvent.click(backButton);
    await waitFor(() => {
        expect(window.location.pathname).toBe('/home');
      });
  });
});
