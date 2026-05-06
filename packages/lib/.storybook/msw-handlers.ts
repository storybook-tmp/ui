import { http, HttpResponse } from "msw";

export const mswHandlers = {
  auth: [
    // AuthProvider checks auth by POSTing to /graphql/query
    http.post("*/graphql/query", () =>
      HttpResponse.json({
        data: {
          user: {
            userId: "storybook-user",
          },
        },
      }),
    ),
  ],
  login: [
    http.post("*/login", () => HttpResponse.json({ ok: true })),
  ],
  logout: [
    http.get("*/logout", () => HttpResponse.json({ ok: true })),
  ],
};
