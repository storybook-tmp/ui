import { http, HttpResponse } from 'msw';

export const mswHandlers = [
  // AuthProvider checks auth by POSTing to /graphql/query
  http.post('*/graphql/query', () =>
    HttpResponse.json({
      data: {
        user: {
          userId: 'storybook-user',
        },
      },
    }),
  ),
  // Local login endpoint
  http.post('*/login', () => new HttpResponse(null, { status: 200 })),
  // Logout endpoint
  http.get('*/logout', () => new HttpResponse(null, { status: 200 })),
];
