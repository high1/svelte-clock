import { defineConfig, loadEnv, type ConfigEnv } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import uno from 'unocss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import sveltePreprocess from 'svelte-preprocess';

export default ({ mode }: ConfigEnv) =>
  defineConfig({
    base: loadEnv(mode, process.cwd(), '')['BASE'] ?? '',
    plugins: [
      tsconfigPaths({
        projects: ['tsconfig.json', 'tsconfig.svelte.json'],
        loose: true,
      }),
      svelte({ preprocess: sveltePreprocess() }),
      uno(),
    ],
  });
