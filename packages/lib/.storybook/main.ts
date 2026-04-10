import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  staticDirs: ['../public'],
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
  async viteFinal(baseConfig) {
    return mergeConfig(baseConfig, {
      optimizeDeps: {
        include: [
          "@leafygreen-ui/badge",
          "@leafygreen-ui/button",
          "@leafygreen-ui/checkbox",
          "@leafygreen-ui/guide-cue",
          "@leafygreen-ui/icon-button",
          "@leafygreen-ui/leafygreen-provider",
          "@leafygreen-ui/select",
          "@leafygreen-ui/toast",
          "@leafygreen-ui/tooltip",
          "query-string",
        ],
      },
      resolve: {
        alias: {
          "@emotion/server": "@emotion/css",
        },
      },
    });
  },
};

export default config;
