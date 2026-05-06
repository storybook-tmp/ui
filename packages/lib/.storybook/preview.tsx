import type { Preview } from '@storybook/react-vite';
import { Global } from '@emotion/react';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { resetStyles, bodyStyles } from '../src/components/styles/globalStyles';
import { fontStyles } from '../src/components/styles/fonts';
import { mswHandlers } from './msw-handlers';

initialize({ onUnhandledRequest: 'bypass' });

const preview: Preview = {
  decorators: [
    (Story) => (
      <>
        <Global styles={[resetStyles, bodyStyles, fontStyles]} />
        <Story />
      </>
    ),
    (Story) => (
      <LeafyGreenProvider>
        <Story />
      </LeafyGreenProvider>
    ),
    (Story, context) => {
      const { reactRouter } = context.parameters;
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
