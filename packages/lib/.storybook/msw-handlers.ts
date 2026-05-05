import { http, HttpResponse } from "msw";

export const mswHandlers = [
  http.post("https://evergreen-mock.example.com/graphql/query", () =>
    HttpResponse.json({
      data: {
        user: {
          userId: "mock-user-id",
        },
      },
    }),
  ),
  http.post("https://evergreen-mock.example.com/login", () =>
    HttpResponse.json({ message: "ok" }),
  ),
  http.get("https://evergreen-mock.example.com/logout", () =>
    HttpResponse.json({ message: "ok" }),
  ),
];
