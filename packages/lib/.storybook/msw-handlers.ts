import { http, HttpResponse } from "msw";

export const mswHandlers = [
  // Auth check - AuthProvider makes a POST to /graphql/query on mount
  http.post("*/graphql/query", () =>
    HttpResponse.json({
      data: {
        user: {
          userId: "storybook-user",
        },
      },
    }),
  ),
  // Login endpoint
  http.post("*/login", () => HttpResponse.json({ ok: true })),
  // Logout endpoint
  http.get("*/logout", () => HttpResponse.json({ ok: true })),
];
