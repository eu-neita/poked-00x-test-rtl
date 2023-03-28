import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

it('testa as funcionalidades do botão proximo pokemon', async () => {
  // renderWithRouter(<App />);
  renderWithRouter(<App />);
  const encontredPokemonRole = screen.getByRole('heading', { name: 'Encountered Pokémon', level: 2 });
  expect(encontredPokemonRole).toBeInTheDocument();

  const nextPoke = screen.getByText('Próximo Pokémon');
  userEvent.click(nextPoke);
  const poke = await screen.findByText('Charmander');
  expect(poke).toBeInTheDocument();

  const arrFilters = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];

  arrFilters.forEach(async (cases) => {
    const filterButton = await screen.findByText(cases);
    expect(filterButton).toBeInTheDocument();
    expect(filterButton).toHaveAttribute('data-testid', 'pokemon-type-button');
    userEvent.click(filterButton);
  });
  const filterButtonAll = await screen.findByText('All');
  expect(filterButtonAll).toBeInTheDocument();
  expect(filterButtonAll).not.toHaveAttribute('data-testid', 'pokemon-type-button');
  userEvent.click(filterButtonAll);
  const type = await screen.findByTestId('pokemon-type');
  expect(type).toHaveTextContent('Electric');
});

it('testa ao clikado no filtro o devido filtro é alicado', async () => {
  renderWithRouter(<App />);
  const poke = screen.getByText('Fire');
  userEvent.click(poke);
  const type = await screen.findByTestId('pokemon-type');
  expect(type).toHaveTextContent('Fire');
});
