import { http, HttpResponse } from 'msw';

const evergreenAppURL = 'http://localhost:9090';

export const mswHandlers = {
  auth: [
    http.post(`${evergreenAppURL}/graphql/query`, () =>
      HttpResponse.json({ data: { user: { userId: 'storybook-user' } } }),
    ),
    http.post(`${evergreenAppURL}/login`, () => HttpResponse.json({ ok: true })),
    http.get(`${evergreenAppURL}/logout`, () => HttpResponse.text('')),
  ],
};
