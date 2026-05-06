// Stub for @emotion/server to avoid Buffer polyfill issues in browser
export default function createEmotionServer() {
  return {
    extractCritical: (html) => ({ html, css: '', ids: [] }),
    extractCriticalToChunks: (html) => ({ html, styles: [] }),
    renderStylesToString: (html) => html,
    renderStylesToNodeStream: () => null,
    constructStyleTagsFromChunks: () => '',
  };
}
export { createEmotionServer };
