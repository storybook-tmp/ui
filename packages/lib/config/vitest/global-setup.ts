import { Buffer as BufferPolyfill } from "buffer";

// Need to specify a static timezone so tests do not fail when run on computers in different regions
module.exports = async () => {
  process.env.TZ = "UTC";

  // Polyfill Buffer for browser environment in Storybook tests
  if (typeof globalThis.Buffer === "undefined") {
    globalThis.Buffer = BufferPolyfill;
  }
};
