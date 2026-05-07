/* eslint-disable storybook/no-uninstalled-addons */
import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const currentDir = dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)", "./eval-support/*.mdx"],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
  ],
  framework: "@storybook/react-vite",
  staticDirs: ["../public"],
  viteFinal: async (config) =>
    mergeConfig(config, {
      define: {
        "process.env": JSON.stringify({
          NODE_ENV: "test",
          REACT_APP_RELEASE_STAGE: "local",
        }),
      },
      resolve: {
        alias: {
          "@leafygreen-ui/emotion": resolve(
            currentDir,
            "leafygreen-emotion-shim.ts",
          ),
        },
      },
    }),
};

export default config;
