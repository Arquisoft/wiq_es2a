import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import AddUser from './AddUser';
import { BrowserRouter} from 'react-router-dom';

const mockAxios = new MockAdapter(axios);

describe('AddUser component', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it('should add user successfully', async () => {
    render(
      <BrowserRouter>
        <AddUser />
      </BrowserRouter>
    );

    const usernameInput = screen.getByLabelText(/Nombre de usuario/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);
    const addUserButton = screen.getByRole('button', { name: /Registrarse/i });

    // Mock the axios.post request to simulate a successful response
    mockAxios.onPost('http://localhost:8000/adduser').reply(200);

    // Simulate user input
    fireEvent.change(usernameInput, { target: { value: 'testUser' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });

    // Trigger the add user button click
    fireEvent.click(addUserButton);

    // Wait for the Snackbar to be open
    await waitFor(() => {
      expect(screen.getByText(/Usuario añadido con éxito/i)).toBeInTheDocument();
    });
  });

  it('should handle error when adding user', async () => {
    render(
      <BrowserRouter>
        <AddUser />
      </BrowserRouter>
    );

    const usernameInput = screen.getByLabelText(/Nombre de usuario/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);
    const addUserButton = screen.getByRole('button', { name: /Registrarse/i });

    // Mock the axios.post request to simulate an error response
    mockAxios.onPost('http://localhost:8000/adduser').reply(500, { error: 'Internal Server Error' });

    // Simulate user input
    fireEvent.change(usernameInput, { target: { value: 'testUser' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });

    // Trigger the add user button click
    fireEvent.click(addUserButton);

    // Wait for the error Snackbar to be open
    await waitFor(() => {
      expect(screen.getByText(/Error: Internal Server Error/i)).toBeInTheDocument();
    });
  });

  it('should handle error when adding user with empty username', async () => {
    render(
      <BrowserRouter>
        <AddUser />
      </BrowserRouter>
    );

    const usernameInput = screen.getByLabelText(/Nombre de usuario/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);
    const addUserButton = screen.getByRole('button', { name: /Registrarse/i });

    // Mock the axios.post request to simulate an error response
    mockAxios.onPost('http://localhost:8000/adduser').reply(400, { error: 'El nombre de usuario no puede estar vacío' });

    // Simulate user input
    fireEvent.change(usernameInput, { target: { value: ' ' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });

    // Trigger the add user button click
    fireEvent.click(addUserButton);

    // Wait for the error Snackbar to be open
    await waitFor(() => {
      expect(screen.getByText(/Error: El nombre de usuario no puede estar vacío/i)).toBeInTheDocument();
    });
  });
  it('should handle error when adding user with empty password', async () => {
    render(
      <BrowserRouter>
        <AddUser />
      </BrowserRouter>
    );

    const usernameInput = screen.getByLabelText(/Nombre de usuario/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);
    const addUserButton = screen.getByRole('button', { name: /Registrarse/i });

    // Mock the axios.post request to simulate an error response
    mockAxios.onPost('http://localhost:8000/adduser').reply(400, { error: 'La contraseña no puede estar vacía' });

    // Simulate user input
    fireEvent.change(usernameInput, { target: { value: 'testUser' } });
    fireEvent.change(passwordInput, { target: { value: ' ' } });

    // Trigger the add user button click
    fireEvent.click(addUserButton);

    // Wait for the error Snackbar to be open
    await waitFor(() => {
      expect(screen.getByText(/Error: La contraseña no puede estar vacía/i)).toBeInTheDocument();
    });
  });

  it('try to add user with username existing', async () => {
    render(
      <BrowserRouter>
        <AddUser />
      </BrowserRouter>
    );

    const usernameInput = screen.getByLabelText(/Nombre de usuario/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);
    const addUserButton = screen.getByRole('button', { name: /Registrarse/i });

    // Mock the axios.post request to simulate an error response
    mockAxios.onPost('http://localhost:8000/adduser').reply(400, { error: 'Este nombre de usuario está en uso' });

    // Simulate user input
    fireEvent.change(usernameInput, { target: { value: 'testUser' } });
    fireEvent.change(passwordInput, { target: { value: 'testPass' } });

    // Trigger the add user button click
    fireEvent.click(addUserButton);

    // Wait for the Snackbar to be open
    await waitFor(() => {
      expect(screen.getByText(/Error: Este nombre de usuario está en uso/i)).toBeInTheDocument();
    });
  });
});
