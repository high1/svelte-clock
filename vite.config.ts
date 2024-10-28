import { defineConfig, loadEnv, type ConfigEnv } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { svelteTesting } from '@testing-library/svelte/vite';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

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
    ],
    test: {
      coverage: {
        include: ['src'],
      },
      environment: 'happy-dom',
      setupFiles: 'test.config.ts',
    },
  });
