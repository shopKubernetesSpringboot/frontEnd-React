import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { getByText, getByTestId } = render(<App />);
  const linkReact = getByText(/learn react/i);
  const linkGithub = getByText(/David G. Folch/i);
  // const buttonAxios = getByTestId(/axiosButton/i);
  // expect(container.querySelector("#axiosButton").textContent).toBe("Axios");
  expect(linkReact).toBeInTheDocument();
  expect(linkGithub).toBeInTheDocument();
  // expect(buttonAxios).toBeInTheDocument();
});