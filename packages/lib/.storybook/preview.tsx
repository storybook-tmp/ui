import type { Preview } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import { ToastProvider } from '../src/context/toast';
import './global-styles.css';

const preview: Preview = {
  decorators: [
    (Story) => (
      <MemoryRouter>
        <ToastProvider>
          <Story />
        </ToastProvider>
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
  },
};

export default preview;
