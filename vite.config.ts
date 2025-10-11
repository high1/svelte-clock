/// <reference types="vitest/config" />

import { defineConfig, loadEnv } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { svelteTesting } from '@testing-library/svelte/vite';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { checker } from 'vite-plugin-checker';

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
    mode === 'test' && svelteTesting(),
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint . --max-warnings 0',
        useFlatConfig: true,
      },
    }),
  ],
}));
