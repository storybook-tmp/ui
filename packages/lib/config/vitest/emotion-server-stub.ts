// Stub for @emotion/server/create-instance which requires Node.js APIs.
// @emotion/server is only needed for SSR; Storybook renders client-side.
export default function createEmotionServer(_cache: unknown) {
  return {
    renderStylesToString(html: string) {
      return html;
    },
    renderStylesToNodeStream() {
      throw new Error("Not supported in browser");
    },
    extractCritical(html: string) {
      return { html, css: "", ids: [] as string[] };
    },
    extractCriticalToChunks(html: string) {
      return { html, styles: [] as unknown[] };
    },
  };
}
