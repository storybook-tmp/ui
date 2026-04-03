// Stub for @emotion/server/create-instance for browser tests
const createEmotionServer = (cache) => {
  return {
    extractCritical: (html) => ({ html, styles: [] }),
    renderStylesToString: () => '',
    renderStylesToNodeStream: () => null,
    getStyleTags: () => '',
  };
};

module.exports = createEmotionServer;
module.exports.default = createEmotionServer;
