import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkReact = getByText(/learn react/i);
  const linkGithub = getByText(/David G. Folch/i);
  const productsHeader = getByText(/^Product List$/i);
  const cartHeader = getByText(/^Cart$/i);
  // const buttonAxios = getByTestId(/axiosButton/i);
  // expect(container.querySelector("#axiosButton").textContent).toBe(AXIOS);
  expect(linkReact).toBeInTheDocument();
  expect(linkGithub).toBeInTheDocument();
  expect(productsHeader).toBeInTheDocument();
  expect(cartHeader).toBeInTheDocument();
  // expect(buttonAxios).toBeInTheDocument();
});