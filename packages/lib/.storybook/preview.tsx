import { Global } from "@emotion/react";
import type { Preview } from "@storybook/react-vite";
import MockDate from "mockdate";
import { initialize, mswLoader } from "msw-storybook-addon";
import { MemoryRouter } from "react-router-dom";
import { bodyStyles, resetStyles } from "../src/components/styles";
import { RECENT_PAGE_SIZE_KEY } from "../src/constants/pagination";
import { AuthProvider } from "../src/context/AuthProvider";
import { ToastProvider } from "../src/context/toast";
import { mswHandlers, STORYBOOK_EVERGREEN_URL } from "./msw-handlers";

initialize({
  onUnhandledRequest: "bypass",
  quiet: true,
});

const STORYBOOK_NOW = "2025-02-02T12:00:00Z";

const setCookie = (name: string, value: string) => {
  document.cookie = `${name}=${encodeURIComponent(
    value,
  )}; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT`;
};

const preview: Preview = {
  decorators: [
    (Story, context) => {
      const route =
        (context.parameters.reactRouter as { route?: string } | undefined)
          ?.route ?? "/";

      return (
        <MemoryRouter initialEntries={[route]}>
          <AuthProvider
            evergreenAppURL={STORYBOOK_EVERGREEN_URL}
            localAuthRoute="/login"
            remoteAuthURL="/login"
            shouldUseLocalAuth
          >
            <ToastProvider>
              <Global styles={[resetStyles, bodyStyles]} />
              <Story />
            </ToastProvider>
          </AuthProvider>
        </MemoryRouter>
      );
    },
  ],
  loaders: [mswLoader],
  async beforeEach() {
    localStorage.setItem(RECENT_PAGE_SIZE_KEY, "20");
    localStorage.setItem("userId", "storybook-user");
    MockDate.set(STORYBOOK_NOW);
    setCookie("STORYBOOK_GUIDE_SEEN", new Date("2025-02-01").toString());
    setCookie("STORYBOOK_GUIDE_EXPIRED", new Date("2025-01-01").toString());

    return () => {
      MockDate.reset();
    };
  },
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
