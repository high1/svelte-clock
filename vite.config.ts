import { defineConfig, loadEnv, type ConfigEnv } from 'vite';
import { svelte, vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import uno from 'unocss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { checker } from 'vite-plugin-checker';

export default ({ mode }: ConfigEnv) =>
  defineConfig({
    base: loadEnv(mode, process.cwd(), '')['BASE'] ?? '',
    build: {
      cssMinify: 'lightningcss',
    },
    css: {
      transformer: 'lightningcss',
    },
    plugins: [
      tsconfigPaths({ loose: true }),
      uno(),
      svelte({
        hot: mode === 'development',
        preprocess: vitePreprocess({}),
      }),
      checker({
        typescript: true,
        eslint: {
          lintCommand: 'eslint . --max-warnings 0',
        },
      }),
    ],
    test: {
      coverage: {
        include: ['src'],
      },
      environment: 'happy-dom',
      setupFiles: 'test.config.ts',
    },
  });
