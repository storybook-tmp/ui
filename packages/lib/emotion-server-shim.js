// Browser-safe noop shim for @emotion/server/create-instance
// @emotion/server depends on Node.js streams which are unavailable in browser vitest
export default function createEmotionServer() {
  return {
    extractCritical: (html) => ({ html, css: '', ids: [] }),
    extractCriticalToChunks: (html) => ({ html, styles: [] }),
    renderStylesToString: (html) => html,
    renderStylesToNodeStream: () => { throw new Error('@emotion/server is not available in browser'); },
    constructStyleTagsFromChunks: () => '',
  };
}
