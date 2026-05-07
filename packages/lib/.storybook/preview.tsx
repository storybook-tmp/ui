import type { Preview } from '@storybook/react-vite';
import { Global } from '@emotion/react';
import MockDate from 'mockdate';
import { MemoryRouter } from 'react-router-dom';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { resetStyles, bodyStyles } from '../src/components/styles/globalStyles';
import { RECENT_PAGE_SIZE_KEY } from '../src/constants/pagination';
import { AuthProvider } from '../src/context/AuthProvider';
import { ToastProvider } from '../src/context/toast';
import { mswHandlers } from './msw-handlers';

initialize({ onUnhandledRequest: 'bypass' });

const preview: Preview = {
  decorators: [
    (Story) => (
      <MemoryRouter>
        <AuthProvider
          evergreenAppURL="http://localhost:9090"
          localAuthRoute="/login"
          remoteAuthURL="/login"
          shouldUseLocalAuth
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
    msw: {
      handlers: mswHandlers,
    },
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
  async beforeEach() {
    localStorage.setItem(RECENT_PAGE_SIZE_KEY, '10');
    MockDate.set('2024-04-01T12:00:00Z');

    return () => {
      MockDate.reset();
    };
  },
};

export default preview;
