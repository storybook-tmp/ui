import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    './eval-support/*.mdx',
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
  ],
  framework: '@storybook/react-vite',
  viteFinal: async (viteConfig) =>
    mergeConfig(viteConfig, {
      optimizeDeps: {
        include: [
          "@leafygreen-ui/badge",
          "@leafygreen-ui/button",
          "@leafygreen-ui/checkbox",
          "@leafygreen-ui/guide-cue",
          "@leafygreen-ui/icon",
          "@leafygreen-ui/icon-button",
          "@leafygreen-ui/palette",
          "@leafygreen-ui/select",
          "@leafygreen-ui/text-input",
          "@leafygreen-ui/tooltip",
        ],
      },
      resolve: {
        alias: {
          "@emotion/server": "@emotion/css",
        },
      },
    }),
};

export default config;
