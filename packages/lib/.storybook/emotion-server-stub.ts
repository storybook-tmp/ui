// Stub for @emotion/server/create-instance to avoid Node.js Buffer dependency in browser environment
function createEmotionServer(_cache: unknown) {
  return {
    renderStylesToString: (html: string) => html,
    renderStylesToNodeStream: () => {},
    extractCritical: (html: string) => ({ html, css: '', ids: [] as string[] }),
    extractCriticalToChunks: (html: string) => ({ html, styles: [] }),
    constructStyleTagsFromChunks: () => '',
  };
}

export { createEmotionServer as default };
