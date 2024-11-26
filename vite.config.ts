import { defineConfig, loadEnv, type ConfigEnv } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { svelteTesting } from '@testing-library/svelte/vite';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { checker } from 'vite-plugin-checker';

export default ({ mode }: ConfigEnv) =>
  defineConfig({
    base: loadEnv(mode, process.cwd(), '')['BASE'] ?? '',
    plugins: [
      tsconfigPaths({ loose: true }),
      tailwindcss(),
      svelte({
        compilerOptions: {
          hmr: mode === 'development',
        },
      }),
      svelteTesting(),
      checker({
        typescript: true,
        eslint: {
          lintCommand: 'eslint . --max-warnings 0',
          useFlatConfig: true,
        },
      }),
    ],
  });
