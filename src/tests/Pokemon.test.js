import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

it('testa o componente more details', async () => {
  const { history } = renderWithRouter(<App />);
  const pokemonDetails = screen.getByRole('link', { name: 'More details' });
  userEvent.click(pokemonDetails);

  const { pathname } = history.location;
  expect(pathname).toBe('/pokemon/25');
  const Average = screen.getByText('Average weight: 6.0 kg');
  expect(Average).toHaveTextContent('Average weight: 6.0 kg');

  const type = await screen.findByText('Electric');
  expect(type).toHaveTextContent('Electric');

  const name = await screen.findByText('Pikachu');
  expect(name).toHaveTextContent('Pikachu');

  const favoriteLabel = await screen.findByText('Pokémon favoritado?');
  userEvent.click(favoriteLabel);

  const SRC_STAR = '/star-icon.svg';
  const SRC_POKE = 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png';
  const imageStar = await screen.findAllByRole('img', { src: SRC_STAR });
  expect(imageStar[1]).toBeInTheDocument();
  expect(imageStar[1]).toHaveAttribute('src', SRC_STAR);
  expect(imageStar[1]).toHaveAttribute('alt', 'Pikachu is marked as favorite');

  expect(imageStar[0]).toBeInTheDocument();
  expect(imageStar[0]).toHaveAttribute('src', SRC_POKE);
  expect(imageStar[0]).toHaveAttribute('alt', 'Pikachu sprite');
});
