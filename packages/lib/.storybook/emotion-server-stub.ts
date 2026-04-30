// Stub for @emotion/server/create-instance to avoid Buffer dependency in browser
export default function createEmotionServer() {
  return {
    extractCritical: () => ({ html: "", css: "", ids: [] }),
    extractCriticalToChunks: () => ({ html: "", styles: [] }),
    renderStylesToString: (html: string) => html,
    renderStylesToNodeStream: () => null,
    constructStyleTagsFromChunks: () => "",
  };
}
