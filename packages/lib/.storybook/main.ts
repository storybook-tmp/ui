import type { StorybookConfig } from '@storybook/react-vite';

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
  viteFinal: async (storybookConfig) => ({
    ...storybookConfig,
    resolve: {
      ...storybookConfig.resolve,
      alias: {
        ...storybookConfig.resolve?.alias,
        '@emotion/server': '@emotion/css',
      },
    },
  }),
};

export default config;
