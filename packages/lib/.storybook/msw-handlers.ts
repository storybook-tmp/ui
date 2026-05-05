import { http, HttpResponse } from 'msw';

export const handlers = [
  // Mock the auth check endpoint used by AuthProvider
  http.post('http://localhost:9090/graphql/query', () =>
    HttpResponse.json({
      data: {
        user: {
          userId: 'mock-user-id',
        },
      },
    }),
  ),
  // Mock the login endpoint
  http.post('http://localhost:9090/login', () =>
    new HttpResponse(null, { status: 200 }),
  ),
  // Mock the logout endpoint
  http.get('http://localhost:9090/logout', () =>
    new HttpResponse(null, { status: 200 }),
  ),
];
