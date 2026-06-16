// Browser-safe stub for @emotion/server
// This prevents the import of Node.js-only modules in browser tests
// The actual emotion CSS is already injected by @emotion/react at runtime

const createInstance = () => ({
  extractCritical: (html: string) => ({
    html,
    css: '',
    ids: [] as string[],
  }),
  renderStylesToString: (html: string) => html,
  renderStylesToNodeStream: () => ({ write: () => {}, end: () => {} }),
});

const extractCritical = (html: string) => ({
  html,
  css: '',
  ids: [] as string[],
});

export { createInstance, extractCritical };
export default createInstance;
