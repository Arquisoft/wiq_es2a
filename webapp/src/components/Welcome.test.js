import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter} from 'react-router-dom';
import Welcome from './Welcome';

describe('Welcome Component', () => {
  
  it('should render the welcome message', () => {
    render( 
        <BrowserRouter>
          <Welcome />
        </BrowserRouter>
    );
    const welcomeMessage = screen.getByText(/Tu juego favorito de televisión, ¡ahora en tu ordenador!/i);
    expect(welcomeMessage).toBeInTheDocument();
    const welcomeMessage2 = screen.getByText(/Accede a tu cuenta o regístrate para comenzar/i);
    expect(welcomeMessage2).toBeInTheDocument();
    
  });

  it('should navigate to login page when login button is clicked', () => {
    render( 
        <BrowserRouter>
          <Welcome />
        </BrowserRouter>
    );
    const loginButton = screen.getByRole('button', { name: /Iniciar sesión/i });
    fireEvent.click(loginButton);
    expect(window.location.pathname).toBe('/login');
  });

  it('should navigate to signup page when signup button is clicked', () => {
    render( 
        <BrowserRouter>
          <Welcome />
        </BrowserRouter>
    );
    const signupButton = screen.getByRole('button', { name: /Registrarse/i });
    fireEvent.click(signupButton);
    expect(window.location.pathname).toBe('/adduser');
  });

});