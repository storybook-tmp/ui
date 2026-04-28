import { MemoryRouter } from 'react-router-dom';
import { definePreview } from '@storybook/react-vite';

export default definePreview({
  addons: [],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
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
});
