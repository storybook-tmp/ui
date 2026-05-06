import type { Preview } from '@storybook/react-vite';
import { Global } from '@emotion/react';
import { MemoryRouter } from 'react-router-dom';
import { initialize, mswLoader } from 'msw-storybook-addon';
import MockDate from 'mockdate';
import { AuthProvider } from '../src/context/AuthProvider';
import { ToastProvider } from '../src/context/toast';
import { resetStyles, bodyStyles } from '../src/components/styles/globalStyles';
import { evergreenAppURL, mswHandlers } from './msw-handlers';

initialize({
  onUnhandledRequest: 'bypass',
});

const preview: Preview = {
  decorators: [
    (Story) => (
      <MemoryRouter>
        <AuthProvider
          evergreenAppURL={evergreenAppURL}
          localAuthRoute="/login"
          remoteAuthURL="https://evergreen-mock.example.com/auth"
          shouldUseLocalAuth={true}
        >
          <ToastProvider>
            <Global styles={[resetStyles, bodyStyles]} />
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
  async beforeEach() {
    MockDate.set('2024-04-01T12:00:00Z');
  },
};

export default preview;
