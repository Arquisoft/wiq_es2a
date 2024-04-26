import React from 'react';
import { render, fireEvent, screen, waitFor, cleanup } from '@testing-library/react';
import { BrowserRouter} from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Login from './Login';
import App from '../App';
const mockAxios = new MockAdapter(axios);

describe('Login component', () => {
  beforeEach(() => {
    localStorage.clear();
    mockAxios.reset();
    cleanup();
  });


//TEST 1 - Test exitoso de login
  it('should log in successfully', async () => {
    render( 
    <BrowserRouter>
      <Login />
    </BrowserRouter>
    );

    const usernameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const loginButton = screen.getByRole('button', { name: /Login/i });

    // Simulamos la respuesta de la petición axios.post
    mockAxios.onPost('http://localhost:8000/login').reply(200, { token: 'testToken' });

    // Simulamos la entrada de un usuario válido en login
    fireEvent.change(usernameInput, { target: { value: 'testUser' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });

    // Click en el botón de login	
    fireEvent.click(loginButton);

    // Esperamos que se muestre el SnackBar de loggin exitoso
    await waitFor(() => {
      expect(screen.getByText(/Login successful/i)).toBeInTheDocument();
    });

    // Verificar que el token ha sido almacenado en localStorage
    expect(localStorage.getItem('token')).toBe('testToken');

    // Verificar que se ha redirigido a /home
    expect(window.location.pathname).toBe('/home');
  });

  //TEST 2 - Test fallido de login, las credenciales son incorrectas
  it('should handle error when logging in', async () => {
    render( 
      <BrowserRouter>
        <Login />
      </BrowserRouter>
      );

    const usernameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const loginButton = screen.getByRole('button', { name: /Login/i });

    // Simular que ha ocurrido un error en el login
    mockAxios.onPost('http://localhost:8000/login').reply(401, { error: 'Unauthorized' });

    // Simulamos la entrada incorrecta de un usuario
    fireEvent.change(usernameInput, { target: { value: 'testUserError' } });
    fireEvent.change(passwordInput, { target: { value: 'testPasswordError' } });

    // Damos a Login
    fireEvent.click(loginButton);

    // Texto del Snackbar de error
    await waitFor(() => {
      expect(screen.getByText(/Error: Unauthorized/i)).toBeInTheDocument();
    });

    // Verificar que no hay token en localStorage
    expect(localStorage.getItem('token')).toBeNull();
  });

  //TEST 3 - Test de cerrar sesión
  it('should logout successfully', async () => {
    render( 
    <BrowserRouter>
      <App />
    </BrowserRouter>
    );
    const button = screen.getByRole('button', { name: /Login/i });
    fireEvent.click(button);
    const logoutButton = screen.queryByRole('button', { name: /Cerrar sesión/i });
    expect(logoutButton).toBeNull();
    const usernameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const loginButton = screen.getByRole('button', { name: /Login/i });

    mockAxios.onPost('http://localhost:8000/login').reply(200, { token: 'testToken' });

    fireEvent.change(usernameInput, { target: { value: 'testUser' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });

    // Click en el botón de login	
    fireEvent.click(loginButton);
    let logoutButton2;
    await waitFor(() => {
      logoutButton2 = screen.getByRole('button', { name: /Cerrar sesión/i });
      expect(logoutButton2).toBeInTheDocument();
    });
    
    logoutButton2.click();

     // Verificar que el token ha sido borrado del localStorage
     expect(localStorage.getItem('token')).toBeNull();

     // Verificar que se ha redirigido a /
     expect(window.location.pathname).toBe('/');
  
  });
});