// Shim for @emotion/server/create-instance to avoid Node.js Buffer dependency in browser
export default function createEmotionServer() {
  return {
    extractCritical: () => ({ html: '', css: '', ids: [] }),
    renderStylesToString: (html) => html,
    renderStylesToNodeStream: () => null,
  };
}
