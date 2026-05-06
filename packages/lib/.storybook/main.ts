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
  staticDirs: ['../public'],
  framework: '@storybook/react-vite',
  async viteFinal(config) {
    const { mergeConfig } = await import('vite');
    return mergeConfig(config, {
      define: {
        'process.env': JSON.stringify({
          NODE_ENV: 'development',
          REACT_APP_RELEASE_STAGE: 'local',
          REACT_APP_EVERGREEN_URL: 'http://localhost:9090',
          REACT_APP_SPRUCE_URL: 'http://localhost:3000',
        }),
      },
      resolve: {
        alias: {
          buffer: 'buffer/',
        },
      },
      optimizeDeps: {
        include: ['buffer'],
      },
    });
  },
};

export default config;
