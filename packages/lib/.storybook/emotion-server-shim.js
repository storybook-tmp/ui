// Empty shim for @emotion/server/create-instance to avoid Node.js Buffer
// dependency in the browser. @leafygreen-ui/emotion imports this module
// but only uses it for SSR, which is not needed in Storybook.
export default function createEmotionServer() {
  return {
    extractCritical: () => ({ html: '', css: '', ids: [] }),
    renderStylesToString: (html) => html,
    renderStylesToNodeStream: () => null,
  };
}
export const extractCritical = () => ({ html: '', css: '', ids: [] });
export const renderStylesToString = (html) => html;
export const renderStylesToNodeStream = () => null;
