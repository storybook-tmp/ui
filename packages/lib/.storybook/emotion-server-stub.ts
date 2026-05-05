// Stub for @emotion/server in browser environments to avoid Buffer dependency
const noop = (html: string) => html;
const createExtractCritical = () => ({
  extractCritical: () => ({ html: '', css: '', ids: [] }),
  extractCriticalToChunks: () => ({ html: '', styles: [] }),
  renderStylesToString: noop,
  renderStylesToNodeStream: () => null,
});

export default createExtractCritical;
export const extractCritical = () => ({ html: '', css: '', ids: [] });
export const extractCriticalToChunks = () => ({ html: '', styles: [] });
export const renderStylesToString = noop;
export const renderStylesToNodeStream = () => null;
