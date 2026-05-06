import { http, HttpResponse } from 'msw';

export const mswHandlers = {
  default: [
    http.get('/api/health', () => HttpResponse.json({ status: 'ok' })),
  ],
};
