/// <reference types="vitest/config" />

import { svelte } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig, loadEnv } from 'vite';
import { checker } from 'vite-plugin-checker';

export default defineConfig(({ mode }) => ({
  base: loadEnv(mode, process.cwd(), '')['BASE'] ?? '',
  plugins: [
    tailwindcss(),
    svelte({
      compilerOptions: {
        hmr: mode === 'development',
      },
      configFile: false,
    }),
    checker({
      eslint: {
        lintCommand: 'eslint . --max-warnings 0',
        useFlatConfig: true,
      },
      typescript: true,
    }),
  ],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    alias: {
      '@/': new URL('./src/', import.meta.url).pathname,
    },
    browser: {
      enabled: true,
      headless: true,
      instances: [{ browser: 'chromium' }],
      provider: playwright(),
      screenshotFailures: false,
    },
    environment: 'happy-dom',
  },
}));
