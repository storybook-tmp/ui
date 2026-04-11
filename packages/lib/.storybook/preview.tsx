import type { Preview } from '@storybook/react-vite';
import { Global } from '@emotion/react';
import { ToastProvider } from '../src/context/toast';
import { resetStyles, bodyStyles } from '../src/components/styles/globalStyles';

const preview: Preview = {
  decorators: [
    (Story) => (
      <ToastProvider>
        <Global styles={resetStyles} />
        <Global styles={bodyStyles} />
        <Story />
      </ToastProvider>
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
