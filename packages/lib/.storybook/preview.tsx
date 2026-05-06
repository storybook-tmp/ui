import type { Preview } from '@storybook/react-vite';
import { Global } from '@emotion/react';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { MemoryRouter } from 'react-router-dom';
import { ToastProvider } from '../src/context/toast';
import { bodyStyles, resetStyles, fontStyles } from '../src/components/styles';
import { mswHandlers } from './msw-handlers';

initialize({ onUnhandledRequest: 'bypass' });

const preview: Preview = {
  decorators: [
    (Story) => (
      <MemoryRouter>
        <ToastProvider>
          <Global styles={[resetStyles, bodyStyles, fontStyles]} />
          <Story />
        </ToastProvider>
      </MemoryRouter>
    ),
  ],
  loaders: [mswLoader],
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
    msw: { handlers: mswHandlers },
  },
};

export default preview;
