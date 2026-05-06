// Stub for @emotion/server/create-instance in browser environments.
// The real module depends on Node's Buffer which is unavailable in Playwright.
export default function createEmotionServer() {
  return {
    extractCritical: (html: string) => ({ html, css: "", ids: [] }),
    extractCriticalToChunks: (html: string) => ({ html, styles: [] }),
    renderStylesToString: (html: string) => html,
    renderStylesToNodeStream: () => {
      throw new Error("renderStylesToNodeStream is not supported in browser");
    },
    constructStyleTagsFromChunks: () => "",
  };
}
