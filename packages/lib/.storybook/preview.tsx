import type { Preview } from '@storybook/react-vite';
import { Global } from '@emotion/react';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { ToastProvider } from '../src/context/toast';
import { fontStyles, resetStyles, bodyStyles } from '../src/components/styles';

initialize({ onUnhandledRequest: 'bypass' });

const preview: Preview = {
  decorators: [
    (Story) => (
      <>
        <Global styles={[fontStyles, resetStyles, bodyStyles]} />
        <ToastProvider>
          <Story />
        </ToastProvider>
      </>
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
  },
};

export default preview;
