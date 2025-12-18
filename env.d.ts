/// <reference types="svelte" />
/// <reference types="vite/client" />
/// <reference types="vitest" />
/// <reference types="vitest-browser-svelte" />

interface ImportMetaEnv {
  readonly BASE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
