import type { StorybookConfig } from '@storybook/react-vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

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
  viteFinal: (config) => {
    config.define = {
      ...config.define,
      'process.env': JSON.stringify({
        NODE_ENV: 'development',
        REACT_APP_RELEASE_STAGE: 'local',
        REACT_APP_EVERGREEN_URL: 'https://evergreen-storybook.example.com',
      }),
    };
    config.resolve = {
      ...config.resolve,
      alias: {
        ...((config.resolve && config.resolve.alias) || {}),
        '@emotion/server/create-instance': path.resolve(
          dirname,
          'emotion-server-shim.ts',
        ),
        '@emotion/server': path.resolve(dirname, 'emotion-server-shim.ts'),
      },
    };
    return config;
  },
};

export default config;
