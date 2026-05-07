import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { Global, css } from "@emotion/react";
import LeafyGreenProvider from "@leafygreen-ui/leafygreen-provider";
import type { Decorator, Preview } from "@storybook/react-vite";
import MockDate from "mockdate";
import { initialize, mswLoader } from "msw-storybook-addon";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import {
  bodyStyles,
  fontStyles,
  resetStyles,
} from "../src/components/styles";
import { RECENT_PAGE_SIZE_KEY } from "../src/constants/pagination";
import { AuthProvider } from "../src/context/AuthProvider";
import { ToastProvider } from "../src/context/toast";
import { mswHandlers } from "./msw-handlers";

initialize({
  onUnhandledRequest: "bypass",
  quiet: true,
});

const globalStyles = css`
  ${fontStyles}
  ${resetStyles}

  body {
    ${bodyStyles}
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
      uri: "/graphql/query",
    }),
  });

const storybookCookieNames = [
  "storybook-announcement-first-view",
  "storybook-announcement-reopens",
  "storybook-announcement-loading",
];

const withAppProviders: Decorator = (Story, context) => {
  const { auth, reactRouter } = context.parameters;
  const { authenticated = true } =
    (auth as { authenticated?: boolean } | undefined) ?? {};
  const { path = "*", route = "/" } =
    (reactRouter as { path?: string; route?: string } | undefined) ?? {};
  const evergreenAppURL = authenticated ? "" : "/storybook-unauthenticated";

  const apolloClient = createApolloClient();
  const router = createMemoryRouter(
    [
      {
        element: (
          <AuthProvider
            evergreenAppURL={evergreenAppURL}
            localAuthRoute="/login"
            remoteAuthURL="/login"
            shouldUseLocalAuth
          >
            <ApolloProvider client={apolloClient}>
              <LeafyGreenProvider baseFontSize={14}>
                <ToastProvider portalClassName="storybook-toast-portal">
                  <Story />
                </ToastProvider>
              </LeafyGreenProvider>
            </ApolloProvider>
          </AuthProvider>
        ),
        errorElement: <div>Failed to render component.</div>,
        path,
      },
    ],
    {
      initialEntries: [route],
    },
  );

  return (
    <>
      <Global styles={globalStyles} />
      <RouterProvider router={router} />
    </>
  );
};

const preview: Preview = {
  decorators: [withAppProviders],
  loaders: [mswLoader],
  beforeEach() {
    localStorage.setItem(RECENT_PAGE_SIZE_KEY, "20");
    MockDate.set("2025-02-02T12:00:00Z");

    storybookCookieNames.forEach((cookieName) => {
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    });

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
