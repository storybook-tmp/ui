// Stub for @emotion/server/create-instance to avoid Buffer dependency in browser mode.
// The @leafygreen-ui/emotion package imports @emotion/server for SSR utilities,
// but these are not needed when running in Storybook's browser environment.
export default function createEmotionServer() {
  return {
    extractCritical: () => ({ html: '', css: '', ids: [] }),
    renderStylesToString: (html: string) => html,
    renderStylesToNodeStream: () => { throw new Error('Not available in browser'); },
  };
}
