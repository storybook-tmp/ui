import type { Preview } from '@storybook/react-vite';
import { Global } from '@emotion/react';
import { MemoryRouter } from 'react-router-dom';
import { ToastProvider } from '../src/context/toast';
import { resetStyles, bodyStyles } from '../src/components/styles/globalStyles';
import { fontStyles } from '../src/components/styles/fonts';

const preview: Preview = {
  decorators: [
    (Story) => (
      <>
        <Global styles={[resetStyles, bodyStyles, fontStyles]} />
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
