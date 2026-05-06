import { http, HttpResponse } from 'msw';

export const mswHandlers = {
  auth: [
    http.post('*/graphql/query', () =>
      HttpResponse.json({ data: { user: { userId: 'test-user' } } }),
    ),
  ],
};
