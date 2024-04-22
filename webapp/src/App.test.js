import { render, screen,waitFor } from '@testing-library/react';
import { BrowserRouter} from 'react-router-dom';
import App from './App';

describe('App component', () => {

  it('renders learn react link',async () => {
    render(
      <BrowserRouter>
          <App/>
      </BrowserRouter>
    );
    
      // Esperamos que se muestre el boton de cerrar sesión
      await waitFor(() => {
        const navElement = screen.getByRole('navigation');
        expect(navElement).toBeInTheDocument();
        expect(screen.getByText(/Cerrar sesión/i)).toBeInTheDocument();
      });
  });

});
