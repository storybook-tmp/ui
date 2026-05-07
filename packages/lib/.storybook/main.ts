import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: [
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "./eval-support/*.mdx",
  ],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
  ],
  framework: "@storybook/react-vite",
  staticDirs: ["../public"],
  viteFinal: (config) => {
    config.define = {
      ...config.define,
      "process.env": {
        NODE_ENV: "development",
        REACT_APP_EVERGREEN_URL: "",
        REACT_APP_HONEYCOMB_BASE_URL: "",
        REACT_APP_PARSLEY_URL: "",
        REACT_APP_RELEASE_STAGE: "local",
        REACT_APP_SIGNAL_PROCESSING_URL: "",
        REACT_APP_SPRUCE_SENTRY_DSN: "",
        REACT_APP_SPRUCE_URL: "",
        REACT_APP_USER_KEY: "",
        REACT_APP_VERSION: "storybook",
      },
    };
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "@emotion/server": "@emotion/css",
    };
    return config;
  },
};

export default config;
