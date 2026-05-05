import { http, HttpResponse } from 'msw';

export const mswHandlers = {
  auth: [
    http.post('*/graphql/query', () =>
      HttpResponse.json({
        data: { user: { userId: 'storybook-user' } },
      }),
    ),
    http.post('*/login', () => HttpResponse.json({ ok: true })),
  ],
};
