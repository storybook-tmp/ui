import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";
import { fileURLToPath } from "node:url";

const resolvePackage = (specifier: string) =>
  fileURLToPath(import.meta.resolve(specifier));

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)", "./eval-support/*.mdx"],
  staticDirs: ["../public"],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
  ],
  framework: "@storybook/react-vite",
  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          events: resolvePackage("events/"),
          process: resolvePackage("process/browser"),
          stream: resolvePackage("stream-browserify"),
          util: resolvePackage("util/"),
        },
      },
    });
  },
};

export default config;
