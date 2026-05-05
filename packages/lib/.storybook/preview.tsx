import type { Preview } from '@storybook/react-vite';
import { Global } from '@emotion/react';
import { MemoryRouter } from 'react-router-dom';
import { ToastProvider } from '../src/context/toast';
import { bodyStyles, resetStyles } from '../src/components/styles/globalStyles';
import { fontStyles } from '../src/components/styles/fonts';
import { RECENT_PAGE_SIZE_KEY } from '../src/constants/pagination';

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
  async beforeEach() {
    localStorage.setItem(RECENT_PAGE_SIZE_KEY, '10');
  },
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
