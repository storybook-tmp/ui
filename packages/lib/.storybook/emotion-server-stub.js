export default function createEmotionServer() {
  return {
    constructStyleTagsFromChunks: () => '',
    extractCritical: (html) => ({ html, css: '', ids: [] }),
    extractCriticalToChunks: (html) => ({ html, styles: [] }),
    renderStylesToString: (html) => html,
    renderStylesToNodeStream: () => {
      throw new Error('Not available in browser');
    },
  };
}
