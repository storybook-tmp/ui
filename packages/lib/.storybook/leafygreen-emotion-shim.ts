import {
  cache,
  css,
  cx,
  flush,
  getRegisteredStyles,
  hydrate,
  injectGlobal,
  keyframes,
  merge,
  sheet,
} from "@emotion/css";
import { CacheProvider } from "@emotion/react";

const renderStylesToString = (html: string) => html;
const renderStylesToNodeStream = () => {
  throw new Error("renderStylesToNodeStream is not available in Storybook.");
};
const extractCritical = (html: string) => ({
  css: "",
  html,
  ids: [],
});

const emotion = {
  cache,
  css,
  cx,
  flush,
  getRegisteredStyles,
  hydrate,
  injectGlobal,
  keyframes,
  merge,
  sheet,
};

export {
  CacheProvider,
  cache,
  css,
  cx,
  emotion as default,
  extractCritical,
  flush,
  getRegisteredStyles,
  hydrate,
  injectGlobal,
  keyframes,
  merge,
  renderStylesToNodeStream,
  renderStylesToString,
  sheet,
};
