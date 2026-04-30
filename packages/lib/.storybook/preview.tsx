import { Global, css } from "@emotion/react";
import { MemoryRouter } from "react-router-dom";
import type { Preview } from '@storybook/react-vite';
import {
  bodyStyles,
  fontStyles,
  resetStyles,
} from "../src/components/styles";

const globalStyles = css`
  ${fontStyles}
  ${resetStyles}
  background-color: white;

  body {
    ${bodyStyles}
  }
`;

const preview: Preview = {
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Global styles={globalStyles} />
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
};

export default preview;
