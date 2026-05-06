import type { Preview } from '@storybook/react-vite';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { mswHandlers } from './msw-handlers';

initialize({ onUnhandledRequest: 'bypass' });

const preview: Preview = {
  decorators: [
    (Story, context) => {
      const { parameters: storyParameters } = context;
      const { reactRouter } = storyParameters;
      const { params, path, route } = reactRouter || {};
      const routes = [
        {
          path: path || '/',
          parameters: params || {},
          element: <Story />,
          errorElement: <div>Failed to render component.</div>,
        },
      ];
      const memoryRouter = createMemoryRouter(routes, {
        initialEntries: [route || '/'],
      });
      return <RouterProvider router={memoryRouter} />;
    },
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
    msw: { handlers: mswHandlers },
  },
};

export default preview;
