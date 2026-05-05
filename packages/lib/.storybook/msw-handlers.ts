import { http, HttpResponse } from 'msw';

export const mswHandlers = {
  auth: [
    http.post('*/graphql/query', () =>
      HttpResponse.json({
        data: {
          user: {
            userId: 'mock-user-id',
          },
        },
      }),
    ),
    http.post('*/login', () => HttpResponse.json({ ok: true })),
    http.get('*/logout', () => HttpResponse.json({ ok: true })),
  ],
};
