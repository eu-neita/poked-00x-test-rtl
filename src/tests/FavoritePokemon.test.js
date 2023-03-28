import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

it('testa se exibe nenhum pokemon favoritado', async () => {
  // renderWithRouter(<App />);
  const { history } = renderWithRouter(<App />);
  const favoritePokemon = screen.getByRole('link', { name: 'Favorite Pokémon' });
  userEvent.click(favoritePokemon);

  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');

  const aboutTitleOne = await screen.findByText('No favorite Pokémon found');
  expect(aboutTitleOne).toBeInTheDocument();
});

it('testa se exibe adiciona pokemons', async () => {
  // renderWithRouter(<App />);
  renderWithRouter(<App />);

  const details = screen.getByRole('link', { name: 'More details' });
  userEvent.click(details);

  const favoriteLabel = await screen.findByText('Pokémon favoritado?');
  userEvent.click(favoriteLabel);

  const favoritePokemon = await screen.findByRole('link', { name: 'Favorite Pokémon' });
  userEvent.click(favoritePokemon);

  const aboutTitleOne = await screen.findByText('Pikachu');
  expect(aboutTitleOne).toBeInTheDocument();
});
