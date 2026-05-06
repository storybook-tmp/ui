// Shim for @emotion/server/create-instance in the browser environment.
// LeafyGreen's emotion package imports this for SSR, but it requires Buffer
// which is not available in the browser. This provides no-op replacements.
export default function createEmotionServer() {
  return {
    extractCritical: () => ({ html: '', css: '', ids: [] }),
    renderStylesToString: (html) => html,
    renderStylesToNodeStream: () => null,
  };
}
