import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

it('testa se exibe informações sobre a pokedex', async () => {
  // renderWithRouter(<App />);
  const { history } = renderWithRouter(<App />);
  const aboutLink = screen.getByRole('link', { name: 'About' });
  expect(aboutLink).toBeInTheDocument();
  userEvent.click(aboutLink);

  const { pathname } = history.location;
  expect(pathname).toBe('/about');

  const aboutTitleOne = await screen.findByRole(
    'heading',
    { name: 'Pokédex', level: 1 },
  );
  expect(aboutTitleOne).toBeInTheDocument();

  const aboutTitle = await screen.findByRole(
    'heading',
    { name: 'About Pokédex', level: 2 },
  );
  expect(aboutTitle).toBeInTheDocument();

  const pPokedex = await screen.findByText(/This application simulates a Pokédex/i);
  expect(pPokedex).toBeInTheDocument();

  const pPokedexTwo = await screen.findByText(/One can filter Pokémon by type,/i);
  expect(pPokedexTwo).toBeInTheDocument();

  const IMG_SRC = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
  const imagePokedex = await screen.findByRole('img', { src: IMG_SRC });
  expect(imagePokedex).toHaveAttribute('src', IMG_SRC);
  expect(imagePokedex).toBeInTheDocument();
});
