import { MockedProvider } from "@apollo/client/testing/react";
import { Global } from "@emotion/react";
import LeafyGreenProvider from "@leafygreen-ui/leafygreen-provider";
import type { Decorator, Preview } from "@storybook/react-vite";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { bodyStyles, fontStyles, resetStyles } from "../src/components/styles";
import { ToastProvider } from "../src/context/toast";

const decorators: Decorator[] = [
  (Story) => (
    <MockedProvider>
      <LeafyGreenProvider>
        <ToastProvider>
          <Global styles={[fontStyles, resetStyles, bodyStyles]} />
          <Story />
        </ToastProvider>
      </LeafyGreenProvider>
    </MockedProvider>
  ),
  (Story, context) => {
    const { reactRouter } = context.parameters;
    const routes = [
      {
        element: <Story />,
        errorElement: <div>Failed to render component.</div>,
        path: reactRouter?.path || "/",
      },
    ];
    const memoryRouter = createMemoryRouter(routes, {
      initialEntries: [reactRouter?.route || "/"],
    });

    return <RouterProvider router={memoryRouter} />;
  },
];

const preview: Preview = {
  decorators,
  parameters: {
    actions: {
      argTypesRegex: "^on[A-Z].*",
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
  },
};

export default preview;
