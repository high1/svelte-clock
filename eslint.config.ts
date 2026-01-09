/* eslint-disable import-x/no-named-as-default-member */
import { includeIgnoreFile } from '@eslint/compat';
import css from '@eslint/css';
import eslint from '@eslint/js';
import html from '@html-eslint/eslint-plugin';
import stylistic from '@stylistic/eslint-plugin';
import { importX } from 'eslint-plugin-import-x';
import jsonc from 'eslint-plugin-jsonc';
import perfectionist from 'eslint-plugin-perfectionist';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import svelte from 'eslint-plugin-svelte';
import yml from 'eslint-plugin-yml';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import { fileURLToPath } from 'node:url';
import svelteParser from 'svelte-eslint-parser';
import tseslint from 'typescript-eslint';

const commonConfig = defineConfig({
  extends: [
    eslint.configs.recommended,
    tseslint.configs.strictTypeChecked,
    tseslint.configs.stylisticTypeChecked,
    // @ts-expect-error Types of property languageOptions are incompatible. (ts 2322)
    importX.flatConfigs.recommended,
    // @ts-expect-error Types of property languageOptions are incompatible. (ts 2322)
    importX.flatConfigs.typescript,
    stylistic.configs.customize({
      jsx: false,
      semi: true,
    }),
    perfectionist.configs['recommended-natural'],
    prettierRecommended,
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/restrict-template-expressions': [
      'error',
      {
        allowNumber: true,
      },
    ],
  },
});

export default defineConfig(
  includeIgnoreFile(fileURLToPath(new URL('.gitignore', import.meta.url))),
  globalIgnores(['pnpm-lock.yaml']),
  {
    languageOptions: {
      globals: globals.browser,
      parser: tseslint.parser,
      parserOptions: {
        extraFileExtensions: ['.svelte', '.css'],
        projectService: true,
        sourceType: 'module',
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    extends: commonConfig,
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        projectService: './tsconfig.exact.json',
      },
    },
  },
  {
    extends: [
      svelte.configs.recommended,
      ...commonConfig,
      svelte.configs.prettier,
    ],
    files: ['**/*.svelte'],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
  {
    extends: [
      // @ts-expect-error  Type `undefined` is not assignable to type (string | string[])[]’. (ts 2322)
      jsonc.configs['flat/recommended-with-jsonc'],
      // @ts-expect-error  Type `undefined` is not assignable to type (string | string[])[]’. (ts 2322)
      jsonc.configs['flat/prettier'],
      prettierRecommended,
    ],
    files: ['**/*.json'],
  },
  {
    extends: [
      yml.configs['flat/recommended'],
      yml.configs['flat/prettier'],
      prettierRecommended,
    ],
    files: ['**/*.{yml,yaml}'],
  },
  {
    extends: ['css/recommended', prettierRecommended],
    files: ['**/*.css'],
    language: 'css/css',
    plugins: { css },
    rules: {
      'css/no-invalid-at-rules': 'off',
    },
  },
  {
    extends: ['html/recommended'],
    files: ['**/*.html'],
    language: 'html/html',
    plugins: { html },
    rules: {
      'html/attrs-newline': [
        'error',
        { closeStyle: 'newline', ifAttrsMoreThan: 3 },
      ],
      'html/indent': ['error', 2],
      'html/no-trailing-spaces': 'error',
    },
  },
);
