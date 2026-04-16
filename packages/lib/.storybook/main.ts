import type { StorybookConfig } from "@storybook/react-vite";
import {
  previewHead,
  viteFinal as sharedViteFinal,
} from "@evg-ui/storybook-addon";

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "./eval-support/*.mdx",
  ],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "storybook-addon-apollo-client",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {
      builder: {
        viteConfigPath: "vitest.config.ts",
      },
    },
  },
  previewHead,
  staticDirs: ["../public"],
  viteFinal: async (config, options) => {
    const resolvedConfig = await sharedViteFinal?.(config, options);
    const nextConfig = resolvedConfig ?? config;

    nextConfig.resolve = nextConfig.resolve ?? {};
    nextConfig.resolve.alias = {
      ...(nextConfig.resolve.alias ?? {}),
      "lodash/debounce": "lodash/debounce.js",
      "lodash/isEqual": "lodash/isEqual.js",
      "lodash/isUndefined": "lodash/isUndefined.js",
    };
    nextConfig.optimizeDeps = nextConfig.optimizeDeps ?? {};
    nextConfig.optimizeDeps.include = [
      ...(nextConfig.optimizeDeps.include ?? []),
      "@emotion/react",
      "@emotion/styled",
      "@leafygreen-ui/badge",
      "@leafygreen-ui/button",
      "@leafygreen-ui/checkbox",
      "@leafygreen-ui/guide-cue",
      "@leafygreen-ui/icon",
      "@leafygreen-ui/icon-button",
      "@leafygreen-ui/leafygreen-provider",
      "@leafygreen-ui/pagination",
      "@leafygreen-ui/popover",
      "@leafygreen-ui/search-input",
      "@leafygreen-ui/select",
      "@leafygreen-ui/table",
      "@leafygreen-ui/text-input",
      "@leafygreen-ui/toast",
      "@leafygreen-ui/tooltip",
      "@leafygreen-ui/typography",
      "@sentry/core",
      "@sentry/react",
      "date-fns",
      "js-cookie",
      "query-string",
      "react-router-dom",
    ];
    nextConfig.define = {
      ...(nextConfig.define ?? {}),
      "process.env": JSON.stringify({
        NODE_ENV: "test",
        REACT_APP_EVERGREEN_URL: "https://storybook.evergreen.test",
        REACT_APP_RELEASE_STAGE: "local",
        REACT_APP_SPRUCE_URL: "http://localhost:6008",
        REACT_APP_USER_KEY: "storybook-user",
      }),
    };

    return nextConfig;
  },
};

export default config;
