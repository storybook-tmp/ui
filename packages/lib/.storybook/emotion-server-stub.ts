// Stub for @emotion/server/create-instance to avoid Buffer polyfill issues in browser-based vitest.
// @leafygreen-ui/emotion calls createEmotionServer(cache), which returns { extractCritical, ... }.
const createEmotionServer = () => ({
  renderStylesToString: (html: string) => html,
  extractCritical: (html: string) => ({ html, css: '', ids: [] as string[] }),
  extractCriticalToChunks: (html: string) => ({ html, styles: [] as unknown[] }),
});

export default createEmotionServer;
