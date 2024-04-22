import React from 'react';
import { render, fireEvent, screen , waitFor, cleanup } from '@testing-library/react';
import { BrowserRouter} from 'react-router-dom';
import HomeScreen from './HomeScreen';


describe('HomeScreen component', () => {
    beforeEach(() => {
        localStorage.clear();
        cleanup();
    });

//TEST 1 - Test introduciendo un número de preguntas y dar al boton jugar, se muestra game
  it('should show the components to start the game', async () => {
    render( 
    <BrowserRouter>
      <HomeScreen />
    </BrowserRouter>
    );

    const input = await screen.findByTestId("name-input");
    const slider = screen.getByRole('slider')
    fireEvent.change(slider, {target: {value: '20'}})
    expect(slider.value).toBe("20")
    expect(input.value).toEqual("20");

    const jugarButton = screen.getByText('Jugar');
    fireEvent.click(jugarButton);

    expect(localStorage.getItem('numQuestions')).toBe("20");

    expect(window.location.pathname).toBe('/game');
  
  });

  //TEST 2 - Test dar al botón ver historial, y te lleva al historial
  it('should handle error when logging in', async () => {
    render( 
      <BrowserRouter>
        <HomeScreen />
      </BrowserRouter>
      );

      const historialButton = screen.getByText('Ver historial');
      fireEvent.click(historialButton);

  });
});