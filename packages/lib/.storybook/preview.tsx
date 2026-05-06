import type { Preview } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { mswHandlers } from './msw-handlers';

initialize({ onUnhandledRequest: 'bypass' });

const GLOBAL_STYLES_ID = 'storybook-global-styles';

const preview: Preview = {
  decorators: [
    (Story) => {
      if (!document.getElementById(GLOBAL_STYLES_ID)) {
        const style = document.createElement('style');
        style.id = GLOBAL_STYLES_ID;
        style.textContent = `
          *, *:before, *:after { box-sizing: border-box; }
          body { font-family: "Euclid Circular A", "Helvetica Neue", Helvetica, Arial, sans-serif; font-size: 14px; margin: 0; }
        `;
        document.head.appendChild(style);
      }
      return (
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      );
    },
  ],
  loaders: [mswLoader],
  parameters: {
    msw: { handlers: mswHandlers },
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
