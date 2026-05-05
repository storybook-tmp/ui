import { http, HttpResponse } from "msw";

export const mswHandlers = {
  auth: [
    // AuthProvider checks auth status on mount
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
    http.post("*/login", () => new HttpResponse(null, { status: 200 })),
    // Logout endpoint
    http.get("*/logout", () => new HttpResponse(null, { status: 200 })),
  ],
};
