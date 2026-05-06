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
  viteFinal: async (config) => {
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        // Shim @emotion/server to avoid Node.js Buffer/events dependencies in browser.
        '@emotion/server/create-instance': path.join(
          dirname,
          'emotion-server-shim.js',
        ),
      },
    };
    // Provide process.env for browser (used by environmentVariables utils)
    config.define = {
      ...config.define,
      'process.env': JSON.stringify({}),
    };
    return config;
  },
};

export default config;
