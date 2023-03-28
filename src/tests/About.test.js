import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

it('testa se exibe informações sobre a pokedex', () => {
  // renderWithRouter(<App />);
  const { history } = renderWithRouter(<App />);
  const aboutLink = screen.getByRole('link', { name: 'About' });
  expect(aboutLink).toBeInTheDocument();
  userEvent.click(aboutLink);

  const { pathname } = history.location;
  expect(pathname).toBe('/about');

  const aboutTitle = screen.getByRole(
    'heading',
    { name: 'About Pokédex', level: 2 },
  );
  expect(aboutTitle).toBeInTheDocument();

  const pPokedex = screen.getByText(/This application simulates a Pokédex/i);
  expect(pPokedex).toBeInTheDocument();

  const pPokedexTwo = screen.getByText(/One can filter Pokémon by type,/i);
  expect(pPokedexTwo).toBeInTheDocument();

  const imagePokedex = screen.getByRole('img', { src: 'Pokédex' });
  expect(imagePokedex).toBeInTheDocument();
});
