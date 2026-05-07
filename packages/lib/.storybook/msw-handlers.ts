import { http, HttpResponse } from "msw";

type GraphQLRequestBody = {
  operationName?: string;
  query?: string;
};

const isAuthCheckQuery = (body: GraphQLRequestBody) =>
  !body.operationName &&
  body.query?.includes("user") &&
  body.query?.includes("userId");

const getOperationName = (body: GraphQLRequestBody) =>
  body.operationName ?? body.query?.match(/(?:query|mutation)\s+(\w+)/)?.[1];

export const mswHandlers = {
  graphql: [
    http.post("*/graphql/query", async ({ request }) => {
      const body = (await request.json()) as GraphQLRequestBody;

      if (isAuthCheckQuery(body)) {
        if (request.url.includes("/storybook-unauthenticated/")) {
          return HttpResponse.json(
            { errors: [{ message: "Storybook local auth required." }] },
            { status: 401 },
          );
        }

        return HttpResponse.json(
          {
            data: {
              user: {
                __typename: "User",
                userId: "storybook.user",
              },
            },
          },
          { status: 200 },
        );
      }

      switch (getOperationName(body)) {
        case "AdminBetaFeatures":
          return HttpResponse.json({
            data: {
              spruceConfig: {
                __typename: "SpruceConfig",
                ui: {
                  __typename: "UIConfig",
                  betaFeatures: {
                    __typename: "BetaFeatures",
                  },
                },
              },
            },
          });
        case "UserBetaFeatures":
          return HttpResponse.json({
            data: {
              user: {
                __typename: "User",
                betaFeatures: {
                  __typename: "BetaFeatures",
                },
                userId: "storybook.user",
              },
            },
          });
        case "UpdateUserBetaFeatures":
          return HttpResponse.json({
            data: {
              updateBetaFeatures: {
                __typename: "User",
                betaFeatures: {
                  __typename: "BetaFeatures",
                },
              },
            },
          });
        default:
          return HttpResponse.json(
            {
              errors: [
                {
                  message: `Unhandled Storybook GraphQL operation: ${
                    getOperationName(body) ?? body.query ?? "unknown"
                  }`,
                },
              ],
            },
            { status: 500 },
          );
      }
    }),
  ],
  auth: [
    http.post("*/login", () => HttpResponse.json({ ok: true })),
    http.get("*/logout", () => HttpResponse.json({ ok: true })),
  ],
};
