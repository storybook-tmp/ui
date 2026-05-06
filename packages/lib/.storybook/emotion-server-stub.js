// Stub for @emotion/server/create-instance to avoid Node.js-only dependencies
// (html-tokenize, readable-stream) in the browser environment.
function createEmotionServer() {
  return {
    extractCritical: function(html) { return { html: html, css: "", ids: [] }; },
    renderStylesToString: function(html) { return html; },
    renderStylesToNodeStream: function() {
      throw new Error("@emotion/server is not available in browser environment");
    },
    extractCriticalToChunks: function(html) { return { html: html, styles: [] }; },
    constructStyleTagsFromChunks: function() { return ""; },
  };
}

export default createEmotionServer;
