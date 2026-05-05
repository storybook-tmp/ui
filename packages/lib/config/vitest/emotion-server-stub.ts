// Stub for @emotion/server/create-instance in browser environments (vitest browser mode).
// The real package depends on Node.js builtins (Buffer, readable-stream, events)
// which are not available in the browser.
const createEmotionServer = () => ({
  renderStylesToString: (html: string) => html,
  extractCritical: (html: string) => ({ html, css: '', ids: [] as string[] }),
  extractCriticalToChunks: (html: string) => ({ html, styles: [] as unknown[] }),
});
export default createEmotionServer;
