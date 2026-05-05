import { http, HttpResponse } from 'msw';

export const mswHandlers = {
  auth: [
    http.post('*/graphql/query', async ({ request }) => {
      const body = (await request.json()) as { query?: string };
      if (body?.query?.includes('user')) {
        return HttpResponse.json({
          data: {
            user: {
              userId: 'mock-user-id',
            },
          },
        });
      }
      return HttpResponse.json({ data: {} });
    }),
    http.post('*/login', () => {
      return HttpResponse.json({ ok: true }, { status: 200 });
    }),
    http.get('*/logout', () => {
      return new HttpResponse(null, { status: 200 });
    }),
  ],
};
