import { http, HttpResponse } from "msw";

export const mswHandlers = [
  // AuthProvider checks auth by posting to /graphql/query
  http.post("*/graphql/query", () =>
    HttpResponse.json({
      data: {
        user: {
          userId: "mock-user-id",
        },
      },
    }),
  ),
  // AuthProvider local login
  http.post("*/login", () => new HttpResponse(null, { status: 200 })),
  // AuthProvider logout
  http.get("*/logout", () => new HttpResponse(null, { status: 200 })),
];
