// Stub for @emotion/server/create-instance to avoid Buffer polyfill issues in the browser
const createEmotionServer = () => ({
  extractCritical: (html: string) => ({ html, css: '', ids: [] }),
  renderStylesToString: (html: string) => html,
  renderStylesToNodeStream: () => {
    throw new Error('renderStylesToNodeStream is not supported in the browser');
  },
});

export default createEmotionServer;
