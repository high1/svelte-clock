/// <reference types="svelte" />
/// <reference types="vite/client" />
/// <reference types="vitest" />

declare module '*.svg?raw' {
  const src: string;
  export default src;
}
