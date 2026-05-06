// Stub for @emotion/server/create-instance in browser environments
// The real @emotion/server pulls in html-tokenize → buffer-from which requires Node.js Buffer
export default function createEmotionServer() {
  return {
    extractCritical: (html: string) => ({ html, ids: [], css: '' }),
    extractCriticalToChunks: (html: string) => ({ html, styles: [] }),
    renderStylesToString: (html: string) => html,
    renderStylesToNodeStream: () => {
      throw new Error('renderStylesToNodeStream is not available in browser');
    },
    constructStyleTagsFromChunks: () => '',
  };
}
export const extractCritical = (html: string) => ({ html, ids: [], css: '' });
export const extractCriticalToChunks = (html: string) => ({ html, styles: [] });
export const renderStylesToString = (html: string) => html;
export const constructStyleTagsFromChunks = () => '';
