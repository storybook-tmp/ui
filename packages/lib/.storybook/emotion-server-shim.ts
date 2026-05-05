// Shim for @emotion/server/create-instance in browser environments
// where Buffer is not available (vitest browser mode)
const noop = () => '';
const noopStream = () => ({ pipe: noop, on: noop });

export default function createEmotionServer() {
  return {
    extractCritical: (html: string) => ({ html, css: '', ids: [] }),
    renderStylesToString: noop,
    renderStylesToNodeStream: noopStream,
  };
}
