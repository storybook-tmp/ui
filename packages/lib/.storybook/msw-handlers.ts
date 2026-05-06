import { http, HttpResponse } from 'msw';

const EVERGREEN_APP_URL = 'http://localhost:9090';

export const mswHandlers = {
  auth: [
    // Auth check - returns successful user query
    http.post(`${EVERGREEN_APP_URL}/graphql/query`, () =>
      HttpResponse.json({
        data: {
          user: {
            userId: 'storybook-user',
          },
        },
      }),
    ),
    // Local login endpoint
    http.post(`${EVERGREEN_APP_URL}/login`, () =>
      new HttpResponse(null, { status: 200 }),
    ),
    // Logout endpoint
    http.get(`${EVERGREEN_APP_URL}/logout`, () =>
      new HttpResponse(null, { status: 200 }),
    ),
  ],
};

export const EVERGREEN_APP_URL_CONSTANT = EVERGREEN_APP_URL;
