import { useMemo } from 'react';
import type { Preview } from '@storybook/react-vite';
import { Global } from '@emotion/react';
import { MemoryRouter } from 'react-router-dom';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { action } from 'storybook/actions';
import { ToastContext } from '../src/context/toast';
import { resetStyles, bodyStyles } from '../src/components/styles/globalStyles';
import { handlers } from './msw-handlers';

initialize({
  onUnhandledRequest: 'bypass',
});

const MockToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const toastContext = useMemo(
    () => ({
      error: (message: React.ReactNode, closable: boolean = true) =>
        action('Toast Error')({ closable, message }),
      hide: () => action('Toast Hide')(),
      info: (message: React.ReactNode, closable: boolean = true) =>
        action('Toast Info')({ closable, message }),
      progress: (
        message: React.ReactNode,
        progress: number = 0.5,
        closable: boolean = true,
      ) => action('Toast Progress')({ closable, message, progress }),
      success: (message: React.ReactNode, closable: boolean = true) =>
        action('Toast Success')({ closable, message }),
      warning: (message: React.ReactNode, closable: boolean = true) =>
        action('Toast Warning')({ closable, message }),
    }),
    [],
  );

  return (
    <ToastContext.Provider value={toastContext}>
      {children}
    </ToastContext.Provider>
  );
};

const preview: Preview = {
  loaders: [mswLoader],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <MockToastProvider>
          <Global styles={resetStyles} />
          <Global styles={bodyStyles} />
          <Story />
        </MockToastProvider>
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
    msw: {
      handlers,
    },
  },
  async beforeEach() {
    localStorage.setItem('recentPageSize', '10');
  },
};

export default preview;
