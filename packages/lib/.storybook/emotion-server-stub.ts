// Stub for @emotion/server/create-instance which is not needed in browser-based
// Storybook tests but gets pulled in by LeafyGreen's dependency tree.
// The real module exports a default function that takes a cache and returns utilities.
const createEmotionServer = () => ({
  extractCritical: (html: string) => ({ html, css: '', ids: [] as string[] }),
  extractCriticalToChunks: (html: string) => ({ html, styles: [] }),
  renderStylesToString: (html: string) => html,
  renderStylesToNodeStream: () => null,
  constructStyleTagsFromChunks: () => '',
});

export default createEmotionServer;
