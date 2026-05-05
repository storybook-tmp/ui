// Stub for @emotion/server/create-instance in browser environment
function createEmotionServer() {
  return {
    extractCritical: function(html) { return { html: html, css: '', ids: [] }; },
    extractCriticalToChunks: function(html) { return { html: html, styles: [] }; },
    renderStylesToString: function(html) { return html; },
    renderStylesToNodeStream: function() { return null; },
  };
}

module.exports = createEmotionServer;
module.exports.default = createEmotionServer;
