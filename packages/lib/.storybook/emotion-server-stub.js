// Stub for @emotion/server/create-instance in browser environments.
function createEmotionServer(_cache) {
  return {
    extractCritical: function(html) { return { html: html, css: "", ids: [] }; },
    extractCriticalToChunks: function(html) { return { html: html, styles: [] }; },
    renderStylesToString: function(html) { return html; },
    renderStylesToNodeStream: function() {
      throw new Error("renderStylesToNodeStream is not available in the browser");
    },
  };
}

module.exports = createEmotionServer;
module.exports.default = createEmotionServer;
