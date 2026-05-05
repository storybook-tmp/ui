// Stub for @emotion/server/create-instance which requires Node's Buffer
function createEmotionServer(_cache) {
  return {
    renderStylesToString: (html) => html,
    extractCritical: (html) => ({ html, css: '', ids: [] }),
    extractCriticalToChunks: (html) => ({ html, styles: [] }),
  };
}

export default createEmotionServer;
