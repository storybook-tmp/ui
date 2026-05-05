// Stub for @emotion/server to avoid Buffer polyfill issues in browser-mode vitest.
// @emotion/server/create-instance exports a function that takes an Emotion cache
// and returns server-rendering utilities. We stub them as no-ops.
const createEmotionServer = () => ({
  extractCritical: (html: string) => ({ html, css: "", ids: [] as string[] }),
  extractCriticalToChunks: (html: string) => ({ html, styles: [] as unknown[] }),
  renderStylesToString: (html: string) => html,
  renderStylesToNodeStream: () => null,
  constructStyleTagsFromChunks: () => "",
});
export default createEmotionServer;
