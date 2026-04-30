import type { Preview } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';

const preview: Preview = {
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
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ padding: '20px' }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
};

export default preview;
