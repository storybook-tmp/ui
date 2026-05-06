// Empty shim to prevent @emotion/server from loading Node.js-only
// dependencies (html-tokenize, readable-stream, buffer-from) in the browser.
export default function createEmotionServer() {
  return {
    extractCritical: () => ({ html: "", css: "", ids: [] }),
    extractCriticalToChunks: () => ({ html: "", styles: [] }),
    renderStylesToString: (html) => html,
    renderStylesToNodeStream: () => null,
    constructStyleTagsFromChunks: () => "",
  };
}
