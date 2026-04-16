import { delay, http, HttpResponse } from "msw";

const getAuthState = (state: string | readonly string[] | undefined) =>
  (Array.isArray(state) ? state[0] : state) ?? "authenticated";

const authenticatedStoryStates = new Set<string>();

const isAuthenticatedState = (state: string) =>
  state.startsWith("authenticated") || authenticatedStoryStates.has(state);

const isPendingAuthenticatedState = (state: string) =>
  state.startsWith("pending-authenticated");

const isPendingAnonymousState = (state: string) =>
  state.startsWith("pending-anonymous");

const respondToAuthCheck = async (state: string) => {
  if (isPendingAnonymousState(state) || isPendingAuthenticatedState(state)) {
    await delay(15_000);
  }

  if (!isAuthenticatedState(state) && !isPendingAuthenticatedState(state)) {
    return HttpResponse.json(
      {
        errors: [{ message: "Unauthorized" }],
      },
      {
        status: 401,
      },
    );
  }

  return HttpResponse.json({
    data: {
      user: {
        userId: "storybook-user",
      },
    },
  });
};

export const mswHandlers = [
  http.post("https://storybook.evergreen.test/:state/graphql/query", async ({ params }) =>
    respondToAuthCheck(getAuthState(params.state)),
  ),
  http.post("https://storybook.evergreen.test/:state/login", async ({ params }) => {
    authenticatedStoryStates.add(getAuthState(params.state));
    return HttpResponse.json({ ok: true });
  }),
  http.get("https://storybook.evergreen.test/:state/logout", async ({ params }) => {
    authenticatedStoryStates.delete(getAuthState(params.state));
    return HttpResponse.json({ ok: true });
  }),
];
