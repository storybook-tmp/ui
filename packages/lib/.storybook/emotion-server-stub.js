// Stub for @emotion/server — not needed in browser-based Storybook tests.
export default function createEmotionServer() {
  return {
    extractCritical: (html) => ({ html, css: '', ids: [] }),
    extractCriticalToChunks: (html) => ({ html, styles: [] }),
    renderStylesToString: (html) => html,
    renderStylesToNodeStream: () => null,
    constructStyleTagsFromChunks: () => '',
  };
}
