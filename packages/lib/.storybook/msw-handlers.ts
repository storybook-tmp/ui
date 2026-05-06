import { http, HttpResponse } from "msw";

export const mswHandlers = [
  // Auth check - AuthProvider queries this on mount to verify authentication
  http.post("*/graphql/query", () =>
    HttpResponse.json({
      data: {
        user: {
          userId: "storybook-user",
        },
      },
    }),
  ),

  // Login endpoint used by LoginPage
  http.post("*/login", () => new HttpResponse(null, { status: 200 })),

  // Logout endpoint used by AuthProvider
  http.get("*/logout", () => new HttpResponse(null, { status: 200 })),
];
