import type { Preview } from '@storybook/react-vite';
import { Global } from '@emotion/react';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { MemoryRouter } from 'react-router-dom';
import { ToastProvider } from '../src/context/toast';
import { resetStyles, bodyStyles } from '../src/components/styles/globalStyles';
import { fontStyles } from '../src/components/styles/fonts';
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
    msw: { handlers: mswHandlers },
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
