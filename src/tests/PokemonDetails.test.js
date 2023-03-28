import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

it('testa toda a página de pokemon details', async () => {
  renderWithRouter(<App />);
  const pokemonDetails = screen.queryByRole('link', { name: 'More details' });
  userEvent.click(pokemonDetails);

  const detailsHeading = screen.getByRole('heading', { name: 'Pikachu Details' });
  expect(detailsHeading).toHaveTextContent('Pikachu Details');

  expect(pokemonDetails).not.toBeInTheDocument();

  const summary = screen.getByRole('heading', { name: 'Summary', level: 2 });
  expect(summary).toBeInTheDocument();

  const resume = screen.getByText(/This intelligent Pokémon roasts/i);
  expect(resume).toBeInTheDocument();

  const locations = screen.getByRole('heading', { name: 'Game Locations of Pikachu', level: 2 });
  expect(locations).toBeInTheDocument();

  const localeOne = screen.getByText(/Kanto Viridian Forest/i);
  const localeTwo = screen.getByText(/Kanto Power Plant/i);
  expect(localeOne).toBeInTheDocument();
  expect(localeTwo).toBeInTheDocument();

  const ploc = 'Pikachu location';
  const SRC_POKE_LOCALE_ONE = 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png';
  const SRC_POKE_LOCALE_TWO = 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png';
  const SRC_POKE_LOCALELALA = 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_';
  const imageLocale = screen.getAllByRole('img', { src: SRC_POKE_LOCALELALA });
  expect(imageLocale[1]).toHaveAttribute('src', SRC_POKE_LOCALE_ONE);
  expect(imageLocale[1]).toHaveAttribute('alt', ploc);
  expect(imageLocale[2]).toHaveAttribute('src', SRC_POKE_LOCALE_TWO);
  expect(imageLocale[2]).toHaveAttribute('alt', ploc);
  // expect(imageStar[0]).toHaveAttribute('src', SRC_POKE);

  // const name = screen.findByText('Pikachu');
  // expect(name).toHaveTextContent('Pikachu');

  const favoriteLabel = screen.getByText('Pokémon favoritado?');
  userEvent.click(favoriteLabel);
  const favoriteButton = await screen.findByRole('checkbox', { type: 'checkbox' });
  expect(favoriteButton.checked).toBe(true);
  userEvent.click(favoriteLabel);
  expect(favoriteButton.checked).toBe(false);
});
