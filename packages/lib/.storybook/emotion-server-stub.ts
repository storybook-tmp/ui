// Stub for @emotion/server/create-instance in browser mode.
// The real module uses Node's Buffer (via html-tokenize) which isn't available in the browser.
export default function createEmotionServer() {
  return {
    extractCritical: (html: string) => ({ html, css: '', ids: [] }),
    extractCriticalToChunks: (html: string) => ({ html, styles: [] }),
    renderStylesToString: (html: string) => html,
    renderStylesToNodeStream: () => {
      throw new Error('@emotion/server is not available in browser');
    },
    constructStyleTagsFromChunks: () => '',
  };
}
