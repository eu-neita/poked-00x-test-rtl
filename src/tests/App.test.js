import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

// test('', () => {});
it('deve renderizar o os links no componente app', async () => {
  const { history } = renderWithRouter(<App />);

  const homeLink = screen.getByRole('link', { name: 'Home' });
  expect(homeLink).toBeInTheDocument();

  const aboutLink = screen.getByRole('link', { name: 'About' });
  expect(aboutLink).toBeInTheDocument();

  const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémon' });
  expect(favoriteLink).toBeInTheDocument();

  history.push('/abc');

  const notFoundLink = await screen.findByRole(
    'heading',
    { name: 'Page requested not found', level: 2 },
  );
  expect(notFoundLink).toBeInTheDocument();
});
