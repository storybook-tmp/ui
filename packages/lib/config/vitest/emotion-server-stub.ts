// Stub for @emotion/server in browser environment
// The server-side rendering module uses Node.js streams which aren't available in the browser
export default function createEmotionServer() {
  return {
    extractCritical: (html: string) => ({ html, css: "", ids: [] }),
    extractCriticalToChunks: (html: string) => ({ html, styles: [] }),
    renderStylesToString: (html: string) => html,
    renderStylesToNodeStream: () => {
      throw new Error("renderStylesToNodeStream is not available in the browser");
    },
    constructStyleTagsFromChunks: () => "",
  };
}
