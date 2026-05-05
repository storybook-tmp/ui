// Browser shim for @emotion/server/create-instance.
// @leafygreen-ui/emotion calls createEmotionServer(cache) at module scope.
// In the browser we don't need SSR extraction, so we return no-op functions.
function createEmotionServer() {
  return {
    extractCritical: (html) => ({ html, css: "", ids: [] }),
    extractCriticalToChunks: (html) => ({ html, styles: [] }),
    renderStylesToString: (html) => html,
    renderStylesToNodeStream: () => null,
  };
}

export default createEmotionServer;
export {
  createEmotionServer,
};
