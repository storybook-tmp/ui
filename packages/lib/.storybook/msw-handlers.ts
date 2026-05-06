import { http, HttpResponse } from 'msw';

// No network calls are made by the library components.
// Handlers are left empty; add endpoint mocks here as stories require them.
export const mswHandlers: ReturnType<typeof http.get>[] = [];
