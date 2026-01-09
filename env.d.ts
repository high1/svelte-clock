/// <reference types="svelte" />
/// <reference types="vite/client" />
/// <reference types="vitest" />
/// <reference types="vitest-browser-svelte" />

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  readonly BASE?: string;
}
