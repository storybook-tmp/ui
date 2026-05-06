import { http, HttpResponse } from "msw";

const MOCK_EVERGREEN_URL = "https://evergreen-mock.example.com";

export const evergreenAppURL = MOCK_EVERGREEN_URL;

export const mswHandlers = {
  auth: [
    // Auth check endpoint — returns a valid user so AuthProvider marks the session as authenticated.
    http.post(`${MOCK_EVERGREEN_URL}/graphql/query`, () =>
      HttpResponse.json({
        data: { user: { userId: "storybook-user" } },
      }),
    ),
    // Login endpoint
    http.post(`${MOCK_EVERGREEN_URL}/login`, () =>
      HttpResponse.json({ message: "ok" }),
    ),
    // Logout endpoint
    http.get(`${MOCK_EVERGREEN_URL}/logout`, () =>
      HttpResponse.json({ message: "ok" }),
    ),
  ],
};
