// Shim for @emotion/server/create-instance to avoid Buffer dependency in browser
const createEmotionServer = () => ({
  extractCritical: (html: string) => ({ html, css: '', ids: [] }),
  renderStylesToString: (html: string) => html,
  renderStylesToNodeStream: () => {
    throw new Error('renderStylesToNodeStream is not supported in browser');
  },
});

export default createEmotionServer;
