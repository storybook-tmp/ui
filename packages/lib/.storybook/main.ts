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
  framework: '@storybook/react-vite',
  staticDirs: ['../public'],
  viteFinal: (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias as Record<string, string> || {}),
      '@emotion/server/create-instance': path.resolve(
        dirname,
        'emotion-server-shim.ts',
      ),
    };
    config.define = {
      ...config.define,
      'process.env': JSON.stringify({
        NODE_ENV: 'development',
        REACT_APP_RELEASE_STAGE: 'local',
        REACT_APP_EVERGREEN_URL: '',
        REACT_APP_SPRUCE_URL: '',
        REACT_APP_PARSLEY_URL: '',
        REACT_APP_VERSION: '',
        REACT_APP_HONEYCOMB_BASE_URL: '',
        REACT_APP_SPRUCE_SENTRY_DSN: '',
        REACT_APP_SIGNAL_PROCESSING_URL: '',
        REACT_APP_USER_KEY: '',
      }),
    };
    return config;
  },
};

export default config;
