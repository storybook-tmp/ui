import { Global, css } from "@emotion/react";
import LeafyGreenProvider from "@leafygreen-ui/leafygreen-provider";
import type { Preview } from "@storybook/react-vite";
import MockDate from "mockdate";
import { MemoryRouter } from "react-router-dom";
import { initialize, mswLoader } from "msw-storybook-addon";
import {
  bodyStyles,
  fontStyles,
  resetStyles,
} from "../src/components/styles";
import { ToastProvider } from "../src/context/toast";
import { mswHandlers } from "./msw-handlers";

initialize({
  onUnhandledRequest: "bypass",
});

const storybookGlobalStyles = css`
  ${fontStyles}
  ${resetStyles}

  body {
    ${bodyStyles}
    background-color: white;
    overscroll-behavior-x: none;
    overscroll-behavior-y: none;
  }

  .storybook-toast-portal {
    z-index: 10;
  }
`;

const clearCookies = () => {
  document.cookie.split(";").forEach((cookie) => {
    const [rawName] = cookie.split("=");
    const name = rawName?.trim();
    if (name) {
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    }
  });
};

const preview: Preview = {
  loaders: [mswLoader],
  decorators: [
    (Story) => (
      <LeafyGreenProvider>
        <MemoryRouter>
          <ToastProvider portalClassName="storybook-toast-portal">
            <Global styles={storybookGlobalStyles} />
            <Story />
          </ToastProvider>
        </MemoryRouter>
      </LeafyGreenProvider>
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
      test: "todo",
    },
    msw: {
      handlers: mswHandlers,
    },
  },
  async beforeEach() {
    MockDate.set("2025-02-01T12:00:00.000Z");
    localStorage.clear();
    sessionStorage.clear();
    clearCookies();
  },
  async afterEach() {
    MockDate.reset();
  },
};

export default preview;
