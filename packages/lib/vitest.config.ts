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
const resolvePackage = (specifier: string) =>
  fileURLToPath(import.meta.resolve(specifier));
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
    alias: {
      events: resolvePackage("events/"),
      process: resolvePackage("process/browser"),
      stream: resolvePackage("stream-browserify"),
      util: resolvePackage("util/"),
    },
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"],
  },
  optimizeDeps: {
    include: [
      "@leafygreen-ui/badge",
      "@leafygreen-ui/button",
      "@leafygreen-ui/checkbox",
      "@leafygreen-ui/guide-cue",
      "@leafygreen-ui/icon",
      "@leafygreen-ui/icon-button",
      "@leafygreen-ui/leafygreen-provider",
      "@leafygreen-ui/popover",
      "@leafygreen-ui/search-input",
      "@leafygreen-ui/skeleton-loader",
      "@leafygreen-ui/table",
      "@leafygreen-ui/text-input",
      "@leafygreen-ui/toast",
      "@leafygreen-ui/tooltip",
      "@leafygreen-ui/typography",
      "date-fns",
      "query-string",
    ],
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
        test: {
          name: "storybook",
          setupFiles: "./config/vitest/setupStorybookTests.ts",
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
