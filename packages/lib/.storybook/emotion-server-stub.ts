// Stub for @emotion/server/create-instance which requires Node.js Buffer.
// Not needed in the browser environment where Storybook stories run.
export default function createEmotionServer() {
  return {
    constructStyleTagsFromChunks: () => '',
    extractCritical: () => ({ html: '', css: '', ids: [] }),
    extractCriticalToChunks: () => ({ html: '', styles: [] }),
    renderStylesToNodeStream: () => null,
    renderStylesToString: (html: string) => html,
  };
}
