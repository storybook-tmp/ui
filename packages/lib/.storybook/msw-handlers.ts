import { HttpResponse, http } from "msw";

const STORYBOOK_EVERGREEN_URL = "https://storybook.local.evergreen";

type StorybookAuthState = {
  authenticated: boolean;
  loginSucceeds: boolean;
};

type StorybookWindow = Window & {
  __EVG_LIB_STORYBOOK_AUTH__?: StorybookAuthState;
};

const getAuthState = (): StorybookAuthState => {
  const storybookWindow = window as StorybookWindow;
  return (
    storybookWindow.__EVG_LIB_STORYBOOK_AUTH__ ?? {
      authenticated: false,
      loginSucceeds: true,
    }
  );
};

const setAuthState = (nextState: StorybookAuthState) => {
  const storybookWindow = window as StorybookWindow;
  storybookWindow.__EVG_LIB_STORYBOOK_AUTH__ = nextState;
};

const parseBody = async (request: Request) => {
  try {
    return (await request.json()) as {
      query?: string;
      variables?: Record<string, unknown>;
    };
  } catch {
    return {};
  }
};

const getGraphQLResponse = (query: string, authenticated: boolean) => {
  if (query.includes("query AdminBetaFeatures")) {
    return {
      data: {
        spruceConfig: {
          ui: {
            betaFeatures: {
              __typename: "BetaFeatures",
            },
          },
        },
      },
    };
  }

  if (query.includes("query UserBetaFeatures")) {
    return {
      data: {
        user: authenticated
          ? {
              userId: "storybook-user",
              betaFeatures: {
                __typename: "BetaFeatures",
              },
            }
          : null,
      },
    };
  }

  if (query.includes("user {") && query.includes("userId")) {
    if (!authenticated) {
      return null;
    }

    return {
      data: {
        user: {
          userId: "storybook-user",
        },
      },
    };
  }

  return null;
};

const authHandlers = [
  http.post(`${STORYBOOK_EVERGREEN_URL}/graphql/query`, async ({ request }) => {
    const { authenticated } = getAuthState();
    const { query = "" } = await parseBody(request);
    const response = getGraphQLResponse(query, authenticated);

    if (!response) {
      return HttpResponse.json(
        {
          errors: [{ message: `Unhandled Storybook GraphQL query: ${query}` }],
        },
        { status: 500 },
      );
    }

    if (!authenticated && query.includes("user {") && query.includes("userId")) {
      return HttpResponse.json(
        { errors: [{ message: "Unauthenticated" }] },
        { status: 401 },
      );
    }

    return HttpResponse.json(response);
  }),
  http.post(`${STORYBOOK_EVERGREEN_URL}/login`, async () => {
    const { loginSucceeds } = getAuthState();
    if (!loginSucceeds) {
      setAuthState({ authenticated: false, loginSucceeds });
      return new HttpResponse(null, { status: 401, statusText: "Unauthorized" });
    }

    setAuthState({ authenticated: true, loginSucceeds });
    return new HttpResponse(null, { status: 200 });
  }),
  http.get(`${STORYBOOK_EVERGREEN_URL}/logout`, async () => {
    const { loginSucceeds } = getAuthState();
    setAuthState({ authenticated: false, loginSucceeds });
    return new HttpResponse(null, { status: 200 });
  }),
];

export { STORYBOOK_EVERGREEN_URL, authHandlers };
