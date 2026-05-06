import { http, HttpResponse } from "msw";

export const mswHandlers = {
  auth: [
    http.post("http://localhost:9090/graphql/query", () =>
      HttpResponse.json({
        data: { user: { userId: "test-user" } },
      }),
    ),
    http.post("http://localhost:9090/login", () =>
      HttpResponse.json({ message: "ok" }),
    ),
    http.get("http://localhost:9090/logout", () =>
      HttpResponse.json({ message: "ok" }),
    ),
  ],
};
