import React from "react";
import { render } from '@testing-library/react';

import InfoBox from "./InfoBox";

test("render with default option", () => {
  const { getByText } = render(<InfoBox />);
  const linkReact = getByText(/learn react/i);
  const linkGithub = getByText(/David G. Folch/i);
  expect(linkReact).toBeInTheDocument();
  expect(linkGithub).toBeInTheDocument();
});
