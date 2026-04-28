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
  viteFinal(config) {
    // Alias @emotion/server to @emotion/css to prevent LeafyGreen's emotion package
    // from pulling in SSR dependencies that use Node.js Buffer.
    // https://jira.mongodb.org/browse/EVG-17077
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@emotion/server': '@emotion/css',
    };
    return config;
  },
};

export default config;
