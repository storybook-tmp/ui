// Stub for @emotion/server/create-instance in browser environments
// Returns no-op implementations of server-side rendering utilities
const createEmotionServer = (_cache: unknown) => ({
  extractCritical: (html: string) => ({ html, css: '', ids: [] as string[] }),
  renderStylesToString: (html: string) => html,
  renderStylesToNodeStream: () => null,
  extractCriticalToChunks: (html: string) => ({ html, styles: [] as unknown[] }),
  constructStyleTagsFromChunks: () => '',
});

export default createEmotionServer;
