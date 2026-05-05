import { http, HttpResponse } from "msw";

export const mswHandlers = [
  // Mock the auth check that AuthProvider makes on mount
  http.post("*/graphql/query", () =>
    HttpResponse.json({
      data: {
        user: {
          userId: "storybook-user",
        },
      },
    }),
  ),
  // Mock the login endpoint
  http.post("*/login", () => HttpResponse.json({ ok: true })),
  // Mock the logout endpoint
  http.get("*/logout", () => HttpResponse.json({ ok: true })),
];
