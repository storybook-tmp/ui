import type { Preview } from '@storybook/react-vite';
import { Global } from "@emotion/react";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import LeafyGreenProvider from "@leafygreen-ui/leafygreen-provider";
import { initialize, mswLoader } from "msw-storybook-addon";
import MockDate from "mockdate";
import { useMemo } from "react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { ToastProvider } from "../src/context/toast";
import { bodyStyles, resetStyles } from "../src/components/styles";
import { RECENT_PAGE_SIZE_KEY } from "../src/constants/pagination";
import { AuthProvider } from "../src/context/AuthProvider";
import { STORYBOOK_EVERGREEN_URL, authHandlers } from "./msw-handlers";

initialize({
  onUnhandledRequest: "bypass",
});

type ReactRouterParameters = {
  initialEntries?: (string | { pathname: string; search?: string; state?: unknown })[];
  path?: string;
  route?: string;
};

type AuthProviderParameters = {
  authenticated?: boolean;
  enabled?: boolean;
  localAuthRoute?: string;
  loginSucceeds?: boolean;
  remoteAuthURL?: string;
  shouldUseLocalAuth?: boolean;
};

type BrowserStateParameters = {
  cookies?: Record<string, string | null>;
  localStorage?: Record<string, string | null>;
};

type StorybookParameters = {
  authProvider?: AuthProviderParameters;
  browserState?: BrowserStateParameters;
  reactRouter?: ReactRouterParameters;
};

const defaultAuthParameters: Required<AuthProviderParameters> = {
  authenticated: false,
  enabled: false,
  localAuthRoute: "/login",
  loginSucceeds: true,
  remoteAuthURL: "https://storybook.local.evergreen/login",
  shouldUseLocalAuth: true,
};

const defaultBrowserState: Required<BrowserStateParameters> = {
  cookies: {},
  localStorage: {
    [RECENT_PAGE_SIZE_KEY]: "10",
  },
};

const storybookApolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: `${STORYBOOK_EVERGREEN_URL}/graphql/query`,
  }),
});

const StorybookProviders: React.FC<{
  authProvider: Required<AuthProviderParameters>;
  children: React.ReactNode;
}> = ({ authProvider, children }) => {
  const content = authProvider.enabled ? (
    <AuthProvider
      evergreenAppURL={STORYBOOK_EVERGREEN_URL}
      localAuthRoute={authProvider.localAuthRoute}
      remoteAuthURL={authProvider.remoteAuthURL}
      shouldUseLocalAuth={authProvider.shouldUseLocalAuth}
    >
      {children}
    </AuthProvider>
  ) : (
    children
  );

  return (
    <LeafyGreenProvider>
      <Global styles={[resetStyles, bodyStyles]} />
      <ApolloProvider client={storybookApolloClient}>
        <ToastProvider>{content}</ToastProvider>
      </ApolloProvider>
    </LeafyGreenProvider>
  );
};

const StorybookRouter: React.FC<{
  authProvider: Required<AuthProviderParameters>;
  children: React.ReactNode;
  reactRouter: ReactRouterParameters;
}> = ({ authProvider, children, reactRouter }) => {
  const router = useMemo(() => {
    const path = reactRouter.path ?? "/";
    const routeElement = (
      <StorybookProviders authProvider={authProvider}>{children}</StorybookProviders>
    );

    return createMemoryRouter(
      [
        {
          element: routeElement,
          errorElement: <div>Failed to render component.</div>,
          path,
        },
        {
          element: <div>Not found</div>,
          path: "*",
        },
      ],
      {
        initialEntries: reactRouter.initialEntries ?? [reactRouter.route ?? path],
      },
    );
  }, [authProvider, children, reactRouter]);

  return <RouterProvider router={router} />;
};

const preview: Preview = {
  decorators: [
    (Story, context) => {
      const parameters = context.parameters as StorybookParameters;
      const authProvider = {
        ...defaultAuthParameters,
        ...parameters.authProvider,
      };

      return (
        <StorybookRouter
          authProvider={authProvider}
          reactRouter={parameters.reactRouter ?? {}}
        >
          <Story />
        </StorybookRouter>
      );
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
    msw: {
      handlers: authHandlers,
    },
  },
  async beforeEach(context) {
    const parameters = context.parameters as StorybookParameters;
    const authProvider = {
      ...defaultAuthParameters,
      ...parameters.authProvider,
    };
    const browserState = {
      ...defaultBrowserState,
      ...parameters.browserState,
      cookies: {
        ...defaultBrowserState.cookies,
        ...parameters.browserState?.cookies,
      },
      localStorage: {
        ...defaultBrowserState.localStorage,
        ...parameters.browserState?.localStorage,
      },
    };

    MockDate.set("2025-02-01T12:00:00.000Z");

    Object.entries(browserState.localStorage).forEach(([key, value]) => {
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, value);
      }
    });

    Object.entries(browserState.cookies).forEach(([name, value]) => {
      if (value === null) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
      } else {
        document.cookie = `${name}=${value}; path=/`;
      }
    });

    (
      window as Window & {
        __EVG_LIB_STORYBOOK_AUTH__?: {
          authenticated: boolean;
          loginSucceeds: boolean;
        };
      }
    ).__EVG_LIB_STORYBOOK_AUTH__ = {
      authenticated: authProvider.authenticated,
      loginSucceeds: authProvider.loginSucceeds,
    };

    return () => {
      MockDate.reset();
    };
  },
};

export default preview;
