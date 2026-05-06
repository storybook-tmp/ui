import { http, HttpResponse } from "msw";

export const mswHandlers = [
  // AuthProvider checks authentication on mount by posting to /graphql/query
  http.post("*/graphql/query", () =>
    HttpResponse.json({
      data: {
        user: {
          userId: "mock-user-id",
        },
      },
    }),
  ),
  // AuthProvider local login endpoint
  http.post("*/login", () => new HttpResponse(null, { status: 200 })),
  // AuthProvider logout endpoint
  http.get("*/logout", () => new HttpResponse(null, { status: 200 })),
];
