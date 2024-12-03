import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default defineConfig((env) =>
  mergeConfig(
    viteConfig(env),
    defineConfig({
      test: {
        coverage: {
          include: ['src'],
        },
        environment: 'happy-dom',
        setupFiles: 'test.config.ts',
      },
    }),
  ),
);
