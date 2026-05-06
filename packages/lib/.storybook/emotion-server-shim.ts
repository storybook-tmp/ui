// Shim for @emotion/server/create-instance in browser environments.
// @leafygreen-ui/emotion imports @emotion/server/create-instance which uses
// html-tokenize that requires Node's Buffer. In Vitest browser mode, Buffer
// is not available, so we provide a no-op shim.
const createEmotionServer = (_cache: unknown) => ({
  extractCritical: (html: string) => ({
    html,
    css: "",
    ids: [] as string[],
  }),
  extractCriticalToChunks: (html: string) => ({
    html,
    styles: [] as { key: string; ids: string[]; css: string }[],
  }),
  renderStylesToString: (html: string) => html,
  renderStylesToNodeStream: () => {
    throw new Error("renderStylesToNodeStream is not available in the browser");
  },
});

export default createEmotionServer;
