// Stub for @emotion/server/create-instance in browser environments.
// @leafygreen-ui/emotion imports this server-only module which depends on Node's Buffer.
export default function createEmotionServer() {
  return {
    extractCritical: (html: string) => ({ html, css: "", ids: [] }),
    extractCriticalToChunks: (html: string) => ({ html, styles: [] }),
    renderStylesToString: (html: string) => html,
    renderStylesToNodeStream: () => {
      throw new Error("renderStylesToNodeStream is not available in browser");
    },
    constructStyleTagsFromChunks: () => "",
  };
}
