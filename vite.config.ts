/// <reference types="vitest/config" />

import { defineConfig, loadEnv } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { checker } from 'vite-plugin-checker';
import { playwright } from '@vitest/browser-playwright';

export default defineConfig(({ mode }) => ({
  base: loadEnv(mode, process.cwd(), '')['BASE'] ?? '',
  plugins: [
    tsconfigPaths({ loose: true }),
    tailwindcss(),
    svelte({
      configFile: false,
      compilerOptions: {
        hmr: mode === 'development',
      },
    }),
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint . --max-warnings 0',
        useFlatConfig: true,
      },
    }),
  ],
  test: {
    browser: {
      provider: playwright(),
      enabled: true,
      headless: true,
      // at least one instance is required
      instances: [{ browser: 'chromium' }],
      screenshotFailures: false,
    },
    environment: 'happy-dom',
    setupFiles: 'vitest-browser-svelte',
  },
}));
