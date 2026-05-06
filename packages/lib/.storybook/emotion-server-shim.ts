// Browser-safe shim for @emotion/server/create-instance
// The real module depends on Node.js Buffer which is not available in the browser
const createEmotionServer = () => ({
  extractCritical: () => ({ html: '', css: '', ids: [] }),
  renderStylesToString: (html: string) => html,
  renderStylesToNodeStream: () => null,
});
export default createEmotionServer;
