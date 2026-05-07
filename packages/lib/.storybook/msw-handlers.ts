import { http, HttpResponse } from "msw";

export const STORYBOOK_EVERGREEN_URL = "http://storybook.evergreen.local";

export const mswHandlers = [
  http.post(`${STORYBOOK_EVERGREEN_URL}/graphql/query`, () =>
    HttpResponse.json(
      {
        data: {
          user: null,
        },
      },
      { status: 401 },
    ),
  ),
  http.post(`${STORYBOOK_EVERGREEN_URL}/login`, () =>
    HttpResponse.json(
      {
        message: "Invalid username or password",
      },
      { status: 401 },
    ),
  ),
  http.get(`${STORYBOOK_EVERGREEN_URL}/logout`, () => HttpResponse.json({})),
];
