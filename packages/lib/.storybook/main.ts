import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    './eval-support/*.mdx',
  ],
  staticDirs: ['../public'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
  ],
  framework: '@storybook/react-vite',
  viteFinal: async (viteConfig) => {
    viteConfig.resolve = viteConfig.resolve ?? {};
    viteConfig.resolve.alias = {
      ...viteConfig.resolve.alias,
      '@emotion/server': '@emotion/css',
    };
    viteConfig.define = {
      ...viteConfig.define,
      'process.env': {
        NODE_ENV: 'development',
        REACT_APP_RELEASE_STAGE: 'local',
        REACT_APP_USER_KEY: 'storybook-user',
      },
    };
    return viteConfig;
  },
};

export default config;
