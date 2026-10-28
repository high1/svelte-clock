import { svelte } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { checker } from 'vite-plugin-checker';

export default defineConfig(({ mode }) => ({
  base: process.env['BASE'] ?? '',
  plugins: [
    tailwindcss(),
    svelte(),
    !process.env['CI'] &&
      mode !== 'test' &&
      checker({
        eslint: { lintCommand: 'eslint . --max-warnings 0' },
        typescript: true,
      }),
  ],
  resolve: {
    tsconfigPaths: true,
  },
}));
