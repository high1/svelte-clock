import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte'
import uno from 'unocss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'node:path';

export default defineConfig({
  base: '/svelte-clock/',
  plugins: [svelte(), uno(), tsconfigPaths()],
  optimizeDeps: {
    disabled: false
  },
  build: {
    commonjsOptions: { include: [] }
  }
});
