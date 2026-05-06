import { http, HttpResponse } from "msw";

const EVERGREEN_APP_URL = "http://localhost:9090";

export const mswHandlers = {
  auth: [
    // Auth check - return authenticated user
    http.post(`${EVERGREEN_APP_URL}/graphql/query`, () =>
      HttpResponse.json({
        data: {
          user: {
            userId: "storybook-user",
          },
        },
      }),
    ),
    // Login endpoint
    http.post(`${EVERGREEN_APP_URL}/login`, () =>
      HttpResponse.json({ message: "ok" }),
    ),
    // Logout endpoint
    http.get(`${EVERGREEN_APP_URL}/logout`, () =>
      HttpResponse.json({ message: "ok" }),
    ),
  ],
};

export { EVERGREEN_APP_URL };
