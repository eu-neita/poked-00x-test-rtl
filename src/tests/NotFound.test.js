import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

// test('', () => {});
it('deve renderizar o notFund', async () => {
  const { history } = renderWithRouter(<App />);

  history.push('/abc');

  const notFoundLink = await screen.findByRole(
    'heading',
    { name: 'Page requested not found', level: 2 },
  );
  expect(notFoundLink).toBeInTheDocument();

  const imageNotfound = screen.getByRole('img', { src: 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif' });
  expect(imageNotfound).toBeInTheDocument();
});
