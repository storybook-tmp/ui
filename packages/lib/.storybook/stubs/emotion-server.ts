// Stub for @emotion/server/create-instance for browser tests
type EmotionCache = any;

interface EmotionServer {
  extractCritical: (html: string) => { html: string; styles: any[] };
  renderStylesToString: () => string;
  renderStylesToNodeStream: () => null;
  getStyleTags: () => string;
}

function createEmotionServer(cache: EmotionCache): EmotionServer {
  return {
    extractCritical: (html: string) => ({ html, styles: [] }),
    renderStylesToString: () => '',
    renderStylesToNodeStream: () => null,
    getStyleTags: () => '',
  };
}

export default createEmotionServer;
export { createEmotionServer };
