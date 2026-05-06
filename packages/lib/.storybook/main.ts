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
  viteFinal(config) {
    config.define = {
      ...config.define,
      'process.env': '{}',
    };
    config.resolve = {
      ...config.resolve,
      alias: {
        ...(config.resolve?.alias ?? {}),
        // @emotion/server/create-instance requires Node.js Buffer; shim it for the browser
        '@emotion/server/create-instance': path.resolve(dirname, 'emotion-server-shim.ts'),
      },
    };
    return config;
  },
};

export default config;
