// Browser-safe no-op mock for @emotion/server/create-instance
// The real package uses html-tokenize -> buffer-from -> Buffer (Node.js only)
export default function createEmotionServer() {
  return {
    extractCritical: (html) => ({ html, css: '', ids: [] }),
    renderStylesToString: (html) => html,
    renderStylesToNodeStream: () => null,
  };
}
