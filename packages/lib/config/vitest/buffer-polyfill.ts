import { Buffer } from "buffer";

if (typeof globalThis.Buffer === "undefined") {
  // @ts-expect-error polyfill Buffer for browser environment
  globalThis.Buffer = Buffer;
}
