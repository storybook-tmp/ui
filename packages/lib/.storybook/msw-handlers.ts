import { HttpResponse, http } from "msw";

export const STORYBOOK_EVERGREEN_URL = "https://evergreen.example.com";

export const mswHandlers = {
  auth: [
    http.post(
      `${STORYBOOK_EVERGREEN_URL}/graphql/query`,
      async ({ request }) => {
        const body = (await request.json().catch(() => ({}))) as {
          operationName?: string;
          query?: string;
        };
        const query = body.query ?? "";

        if (body.operationName === "AdminBetaFeatures") {
          return HttpResponse.json({
            data: {
              spruceConfig: {
                ui: {
                  betaFeatures: {
                    __typename: "BetaFeatures",
                  },
                  __typename: "UIConfig",
                },
                __typename: "SpruceConfig",
              },
            },
          });
        }

        if (body.operationName === "UserBetaFeatures") {
          return HttpResponse.json({
            data: {
              user: {
                betaFeatures: {
                  __typename: "BetaFeatures",
                },
                userId: "storybook-user",
                __typename: "User",
              },
            },
          });
        }

        if (query.includes("user") && query.includes("userId")) {
          return HttpResponse.json(
            {
              errors: [{ message: "Storybook user is not authenticated." }],
            },
            { status: 401 },
          );
        }

        return HttpResponse.json({ data: {} });
      },
    ),
    http.post(`${STORYBOOK_EVERGREEN_URL}/login`, () =>
      HttpResponse.json({ ok: true }),
    ),
    http.get(`${STORYBOOK_EVERGREEN_URL}/logout`, () =>
      HttpResponse.json({ ok: true }),
    ),
  ],
};
