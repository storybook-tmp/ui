import type { Preview } from '@storybook/react-vite';
import { Global } from '@emotion/react';
import { MemoryRouter } from 'react-router-dom';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { AuthProvider } from '../src/context/AuthProvider';
import { ToastProvider } from '../src/context/toast';
import { resetStyles, bodyStyles } from '../src/components/styles/globalStyles';
import { mswHandlers } from './msw-handlers';

initialize({
  onUnhandledRequest: 'bypass',
});

const preview: Preview = {
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Global styles={[resetStyles, bodyStyles]} />
        <AuthProvider
          evergreenAppURL="http://localhost:9090"
          remoteAuthURL="http://localhost:9090/login"
          localAuthRoute="/login"
          shouldUseLocalAuth
        >
          <ToastProvider>
            <Story />
          </ToastProvider>
        </AuthProvider>
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
    msw: {
      handlers: mswHandlers,
    },
  },
};

export default preview;
