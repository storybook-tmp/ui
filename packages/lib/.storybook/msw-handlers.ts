import { http, HttpResponse } from "msw";

export const mswHandlers = {
  auth: [
    // Auth check - AuthProvider POSTs to {evergreenAppURL}/graphql/query on mount
    http.post("*/graphql/query", () =>
      HttpResponse.json({
        data: { user: { userId: "storybook-user" } },
      })
    ),
    // Local login endpoint
    http.post("*/login", () => HttpResponse.json({ ok: true })),
    // Logout endpoint
    http.get("*/logout", () => HttpResponse.json({ ok: true })),
  ],
};
