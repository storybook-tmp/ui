import type { Preview } from '@storybook/react-vite';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../src/context/AuthProvider';
import { ToastProvider } from '../src/context/toast';
import { mswHandlers, EVERGREEN_APP_URL_CONSTANT } from './msw-handlers';

initialize({
  onUnhandledRequest: 'bypass',
});

const preview: Preview = {
  decorators: [
    (Story) => (
      <MemoryRouter>
        <AuthProvider
          evergreenAppURL={EVERGREEN_APP_URL_CONSTANT}
          localAuthRoute="/login"
          remoteAuthURL="/auth"
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
