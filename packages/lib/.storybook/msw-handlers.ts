import { http, HttpResponse } from 'msw';

export const mswHandlers = [
  http.post('*/graphql/query', () =>
    HttpResponse.json({ data: { user: { userId: 'test-user' } } })
  ),
];
