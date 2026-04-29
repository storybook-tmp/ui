// Stub for @emotion/server/create-instance in browser environments.
// The real module depends on Node's Buffer which is unavailable in the browser.
const createEmotionServer = (_cache: unknown) => ({
  extractCritical: (html: string) => ({ html, css: "", ids: [] as string[] }),
  renderStylesToString: (html: string) => html,
  renderStylesToNodeStream: () => {
    throw new Error("renderStylesToNodeStream is not available in the browser");
  },
});

export default createEmotionServer;
