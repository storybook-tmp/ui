import { Global } from "@emotion/react";
import type { Preview } from "@storybook/react-vite";
import { MemoryRouter } from "react-router-dom";
import { initialize, mswLoader } from "msw-storybook-addon";
import {
  resetStyles,
  bodyStyles,
} from "../src/components/styles/globalStyles";
import { fontStyles } from "../src/components/styles/fonts";
import { mswHandlers } from "./msw-handlers";

initialize({
  onUnhandledRequest: "bypass",
});

const preview: Preview = {
  decorators: [
    (Story) => (
      <>
        <Global styles={[resetStyles, bodyStyles, fontStyles]} />
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </>
    ),
  ],
  loaders: [mswLoader],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
    msw: {
      handlers: mswHandlers,
    },
  },
};

export default preview;
