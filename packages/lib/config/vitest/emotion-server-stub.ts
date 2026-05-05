// Stub for @emotion/server/create-instance to avoid Buffer polyfill issues in browser tests
export default function createEmotionServer() {
  return {
    extractCritical: (html: string) => ({ html, css: '', ids: [] }),
    extractCriticalToChunks: (html: string) => ({ html, styles: [] }),
    renderStylesToString: (html: string) => html,
    renderStylesToNodeStream: () => null,
    constructStyleTagsFromChunks: () => '',
  };
}
