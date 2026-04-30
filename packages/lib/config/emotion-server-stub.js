export default function createEmotionServer() {
  return {
    extractCritical: (html) => ({ html, ids: [], css: '' }),
    extractCriticalToChunks: (html) => ({ html, styles: [] }),
    renderStylesToString: (html) => html,
    renderStylesToNodeStream: () => {},
    constructStyleTagsFromChunks: () => '',
  };
}
