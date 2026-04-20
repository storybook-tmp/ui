import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { Global, css } from "@emotion/react";
import LeafyGreenProvider from "@leafygreen-ui/leafygreen-provider";
import type { Preview } from "@storybook/react-vite";
import Cookies from "js-cookie";
import MockDate from "mockdate";
import { initialize, mswLoader } from "msw-storybook-addon";
import { MemoryRouter } from "react-router-dom";
import ErrorBoundary from "../src/components/ErrorBoundary";
import { bodyStyles, fontStyles, resetStyles } from "../src/components/styles";
import { RECENT_PAGE_SIZE_KEY } from "../src/constants/pagination";
import { AuthProvider } from "../src/context/AuthProvider";
import { ToastProvider } from "../src/context/toast";
import { mswHandlers, STORYBOOK_EVERGREEN_URL } from "./msw-handlers";

initialize({
  onUnhandledRequest: "bypass",
  quiet: true,
});

const globalStyles = css`
  ${fontStyles}
  ${resetStyles}
  background-color: white;

  body {
    ${bodyStyles}
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .storybook-toast-portal {
    z-index: 10;
  }
`;

const createApolloClient = () =>
  new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      credentials: "include",
      uri: `${STORYBOOK_EVERGREEN_URL}/graphql/query`,
    }),
  });

const preview: Preview = {
  decorators: [
    (Story, context) => {
      const initialEntries = context.parameters.reactRouter?.initialEntries ?? [
        "/",
      ];

      return (
        <MemoryRouter
          initialEntries={initialEntries}
          key={initialEntries.join("|")}
        >
          <Global styles={globalStyles} />
          <ErrorBoundary homeURL="/">
            <AuthProvider
              evergreenAppURL={STORYBOOK_EVERGREEN_URL}
              localAuthRoute="/login"
              remoteAuthURL={`${STORYBOOK_EVERGREEN_URL}/login`}
              shouldUseLocalAuth
            >
              <ApolloProvider client={createApolloClient()}>
                <LeafyGreenProvider baseFontSize={14}>
                  <ToastProvider portalClassName="storybook-toast-portal">
                    <Story />
                  </ToastProvider>
                </LeafyGreenProvider>
              </ApolloProvider>
            </AuthProvider>
          </ErrorBoundary>
        </MemoryRouter>
      );
    },
  ],
  loaders: [mswLoader],
  parameters: {
    msw: {
      handlers: mswHandlers,
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
  async beforeEach() {
    localStorage.setItem(RECENT_PAGE_SIZE_KEY, "20");

    Cookies.remove("STORYBOOK_NEW_FEATURE");
    Cookies.set(
      "STORYBOOK_SEEN_FEATURE",
      new Date("2026-04-18T12:00:00Z").toString(),
      { expires: 365 },
    );
    Cookies.set(
      "STORYBOOK_EXPIRED_FEATURE",
      new Date("2026-03-01T12:00:00Z").toString(),
      { expires: 365 },
    );

    MockDate.set("2026-04-20T12:00:00Z");
  },
};

export default preview;
