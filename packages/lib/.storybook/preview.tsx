import type { Preview } from '@storybook/react-vite';
import { Global, css } from '@emotion/react';
import { MemoryRouter } from 'react-router-dom';
import { ToastProvider } from '../src/context/toast';
import { fontStyles } from '../src/components/styles/fonts';

const globalAppStyles = css`
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  body {
    font-family: 'Euclid Circular A', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 13px;
    margin: 0;
  }
`;

const preview: Preview = {
  decorators: [
    (Story) => (
      <>
        <Global styles={[globalAppStyles, fontStyles]} />
        <MemoryRouter>
          <ToastProvider>
            <Story />
          </ToastProvider>
        </MemoryRouter>
      </>
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
