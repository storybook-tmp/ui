// Browser-safe shim for @emotion/server/create-instance
// The real module uses html-tokenize which requires Node.js Buffer.
// These SSR functions are not needed in a browser/Storybook context.
export default function createEmotionServer() {
  return {
    extractCritical: (html: string) => ({ html, css: "", ids: [] as string[] }),
    renderStylesToString: (html: string) => html,
    renderStylesToNodeStream: () => {
      throw new Error("renderStylesToNodeStream is not supported in browser");
    },
  };
}
