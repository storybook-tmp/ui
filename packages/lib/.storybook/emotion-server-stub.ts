// Stub for @emotion/server/create-instance which is not needed in browser
// but is imported by @leafygreen-ui/emotion at the top level.
const noop = () => ({ html: "", css: "", ids: [] });
export default () => ({
  extractCritical: noop,
  renderStylesToString: (html: string) => html,
  renderStylesToNodeStream: () => null,
});
