// Stub for @emotion/server/create-instance in browser environments.
// The real module requires Node's Buffer via html-tokenize, which is
// unavailable in Vitest browser mode. Since SSR extraction is not
// needed for Storybook stories, this empty export is sufficient.
export default function createEmotionServer() {
  return {
    extractCritical: (html) => ({ html, css: "", ids: [] }),
    extractCriticalToChunks: (html) => ({ html, styles: [] }),
    renderStylesToString: (html) => html,
    renderStylesToNodeStream: () => null,
    constructStyleTagsFromChunks: () => "",
  };
}
