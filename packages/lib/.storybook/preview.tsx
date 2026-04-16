import type { Preview } from "@storybook/react-vite";
import { initialize, mswLoader } from "msw-storybook-addon";
import { MemoryRouter } from "react-router-dom";
import { ToastProvider } from "../src/context/toast";
import { AuthProvider } from "../src/context/AuthProvider";
import { mswHandlers } from "./msw-handlers";

initialize({
  onUnhandledRequest: "bypass",
});

const preview: Preview = {
  decorators: [
    (Story) => (
      <MemoryRouter>
        <AuthProvider
          evergreenAppURL="https://evergreen.example.com"
          remoteAuthURL="https://auth.example.com"
          localAuthRoute="/login"
          shouldUseLocalAuth={true}
        >
          <ToastProvider>
            <Story />
          </ToastProvider>
        </AuthProvider>
      </MemoryRouter>
    ),
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
      test: "todo",
    },
    msw: {
      handlers: mswHandlers,
    },
  },
};

export default preview;
