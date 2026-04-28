// Stub for @emotion/server/create-instance to prevent Node.js modules from loading in browser
const createEmotionServer = () => ({
  extractCritical: (html: string) => ({ html, css: "", ids: [] as string[] }),
  extractCriticalToChunks: (html: string) => ({ html, styles: [] }),
  renderStylesToString: (html: string) => html,
  renderStylesToNodeStream: () => null,
});

export default createEmotionServer;
