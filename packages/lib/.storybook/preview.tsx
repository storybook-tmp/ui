import { ReactNode } from "react";
import { Global, css } from "@emotion/react";
import LeafyGreenProvider from "@leafygreen-ui/leafygreen-provider";
import { MockedProvider } from "@apollo/client/testing/react";
import type { Decorator, Preview } from "@storybook/react-vite";
import MockDate from "mockdate";
import { initialize, mswLoader } from "msw-storybook-addon";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { bodyStyles, fontStyles, resetStyles } from "../src/components/styles";
import { RECENT_PAGE_SIZE_KEY } from "../src/constants/pagination";
import { AuthProvider } from "../src/context/AuthProvider";
import { mswHandlers } from "./msw-handlers";

type ReactRouterParameters = {
  params?: Record<string, string>;
  path?: string;
  route?: string;
};

type ApolloClientParameters = {
  MockedProvider?: typeof MockedProvider;
  mocks?: React.ComponentProps<typeof MockedProvider>["mocks"];
};
type AuthProviderParameters = {
  localAuthRoute?: string;
  remoteAuthURL?: string;
  shouldUseLocalAuth?: boolean;
  state?: string;
};
type StoryParameters = {
  apolloClient?: ApolloClientParameters;
  authProvider?: AuthProviderParameters;
  reactRouter?: ReactRouterParameters;
};

const STORYBOOK_DATE = "2025-02-01T12:00:00.000Z";

initialize({
  onUnhandledRequest: "bypass",
});

const globalStyles = css`
  ${fontStyles}
  ${resetStyles}
  background-color: white;

  a {
    text-decoration: none;
  }

  fieldset {
    border: 0;
    margin: 0;
    padding: 0;
  }

  body {
    ${bodyStyles}
  }
`;

const decorators: Decorator[] = [
  (Story) => (
    <>
      <Global styles={globalStyles} />
      <Story />
    </>
  ),
  (Story) => (
    <LeafyGreenProvider>
      <Story />
    </LeafyGreenProvider>
  ),
  (
    Story,
    {
      parameters: {
        apolloClient: { MockedProvider: _, ...rest } = {},
      },
    },
  ) => (
    <MockedProvider {...rest}>
      <Story />
    </MockedProvider>
  ),
  (Story, { parameters }) => {
    const { authProvider } = parameters as StoryParameters;

    if (!authProvider) {
      return <Story />;
    }

    const {
      localAuthRoute = "/login",
      remoteAuthURL = "https://auth.storybook.test/login",
      shouldUseLocalAuth = true,
      state = "authenticated",
    } = authProvider;

    return (
      <AuthProvider
        evergreenAppURL={`https://storybook.evergreen.test/${state}`}
        localAuthRoute={localAuthRoute}
        remoteAuthURL={remoteAuthURL}
        shouldUseLocalAuth={shouldUseLocalAuth}
      >
        <Story />
      </AuthProvider>
    );
  },
  (Story, context) => {
    const { reactRouter } = context.parameters as StoryParameters;
    const { params, path = "/", route = "/" } = reactRouter || {};
    const routes = [
      {
        path,
        parameters: params || {},
        element: <Story />,
        errorElement: <div>Failed to render component.</div>,
      },
      {
        path: "*",
        element: <div>Not found</div>,
      },
    ];

    const memoryRouter = createMemoryRouter(routes, {
      initialEntries: [route],
    });

    return <RouterProvider router={memoryRouter} />;
  },
];

const clearCookies = () => {
  document.cookie.split(";").forEach((cookie) => {
    const [rawName] = cookie.split("=");
    const name = rawName?.trim();
    if (!name) {
      return;
    }
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  });
};

const preview: Preview = {
  decorators,
  loaders: [mswLoader],
  beforeEach: async () => {
    MockDate.set(STORYBOOK_DATE);
    clearCookies();
    localStorage.clear();
    sessionStorage.clear();
    localStorage.setItem(RECENT_PAGE_SIZE_KEY, "10");
    localStorage.setItem("userId", "storybook-user");

    return () => {
      MockDate.reset();
      clearCookies();
      localStorage.clear();
      sessionStorage.clear();
    };
  },
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    apolloClient: {
      mocks: [],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    msw: {
      handlers: mswHandlers,
    },
    a11y: {
      test: "todo",
    },
  },
};

export default preview;
