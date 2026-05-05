// Stub for @emotion/server/create-instance which depends on Node's Buffer.
// Not needed in the browser — leafygreen-ui imports it but only uses it server-side.
const createEmotionServer = () => ({
  extractCritical: () => ({ html: '', css: '', ids: [] }),
  renderStylesToString: (html: string) => html,
  renderStylesToNodeStream: () => null,
});
export default createEmotionServer;
