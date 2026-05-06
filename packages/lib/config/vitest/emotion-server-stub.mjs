const createEmotionServer = () => ({
  extractCritical: () => ({ html: "", css: "", ids: [] }),
  extractCriticalToChunks: () => ({ html: "", styles: [] }),
  renderStylesToString: (html) => html,
  renderStylesToNodeStream: () => null,
  constructStyleTagsFromChunks: () => "",
});

export default createEmotionServer;
