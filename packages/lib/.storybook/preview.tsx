import type { Preview } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import { ToastProvider } from '../src/context/toast';

const preview: Preview = {
  decorators: [
    (Story) => (
      <ToastProvider>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
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
