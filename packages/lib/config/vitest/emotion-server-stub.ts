// Stub for @emotion/server in browser tests.
// The real module requires Node's Buffer (via html-tokenize) which is
// unavailable in the browser.  Storybook tests never need SSR extraction.
//
// @emotion/server/create-instance exports a default function that takes a cache
// and returns an object with extraction methods.  @leafygreen-ui/emotion calls
// this function during init — we return no-op implementations.
const createEmotionServer = () => ({
  extractCritical: (html: string) => ({ html, css: "", ids: [] as string[] }),
  extractCriticalToChunks: (html: string) => ({ html, styles: [] as unknown[] }),
  renderStylesToString: (html: string) => html,
  renderStylesToNodeStream: () => null,
  constructStyleTagsFromChunks: () => "",
});
export default createEmotionServer;
export const extractCritical = createEmotionServer().extractCritical;
export const extractCriticalToChunks = createEmotionServer().extractCriticalToChunks;
export const renderStylesToString = createEmotionServer().renderStylesToString;
export const renderStylesToNodeStream = createEmotionServer().renderStylesToNodeStream;
