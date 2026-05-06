import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import react from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));
const playwrightProviderOptions =
  process.env.STORYBOOK_TEST_SCREENSHOTS === "true"
    ? {
        contextOptions: {
          deviceScaleFactor: 2,
          viewport: { width: 393, height: 852 },
          isMobile: true,
          hasTouch: true,
          userAgent:
            "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1",
        },
      }
    : {};

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react({
      babel: {
        plugins: ["import-graphql"],
      },
    }),
  ],
  resolve: {
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"],
    alias: {
      // @leafygreen-ui/emotion imports @emotion/server which requires Node's Buffer.
      // Stub it out in the browser with a no-op module.
      "@emotion/server/create-instance": path.join(
        dirname,
        ".storybook/emotion-server-stub.ts",
      ),
    },
  },
  test: {
    reporters: ["default", ...(process.env.CI === "true" ? ["junit"] : [])],
    outputFile: {
      junit: "./bin/vitest/junit.xml",
    },
    projects: [
      {
        extends: true,
        test: {
          environment: "jsdom",
          globals: true,
          setupFiles: "./config/vitest/setupTests.ts",
          globalSetup: "./config/vitest/global-setup.ts",
        },
      },
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, ".storybook"),
          }),
        ],
        define: {
          "process.env.REACT_APP_RELEASE_STAGE": JSON.stringify("local"),
          "process.env.REACT_APP_EVERGREEN_URL": JSON.stringify(""),
          "process.env.NODE_ENV": JSON.stringify("development"),
          "process.env.REACT_APP_SPRUCE_SENTRY_DSN": JSON.stringify(""),
          "process.env.REACT_APP_SPRUCE_URL": JSON.stringify(""),
          "process.env.REACT_APP_SIGNAL_PROCESSING_URL": JSON.stringify(""),
          "process.env.REACT_APP_PARSLEY_URL": JSON.stringify(""),
          "process.env.REACT_APP_VERSION": JSON.stringify(""),
          "process.env.REACT_APP_HONEYCOMB_BASE_URL": JSON.stringify(""),
          "process.env.REACT_APP_USER_KEY": JSON.stringify(""),
        },
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(playwrightProviderOptions),
            instances: [
              {
                browser: "chromium",
              },
            ],
          },
        },
      },
    ],
  },
});
