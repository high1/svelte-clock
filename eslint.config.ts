/* eslint-disable import-x/no-named-as-default-member */
import e18e from '@e18e/eslint-plugin';
import { includeIgnoreFile } from '@eslint/compat';
import css from '@eslint/css';
import eslint from '@eslint/js';
import json from '@eslint/json';
import html from '@html-eslint/eslint-plugin';
import stylistic from '@stylistic/eslint-plugin';
import { importX } from 'eslint-plugin-import-x';
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
    importX.flatConfigs.recommended,
    importX.flatConfigs.typescript,
    e18e.configs.recommended,
    stylistic.configs.customize({
      jsx: false,
      semi: true,
    }),
    perfectionist.configs['recommended-natural'],
    prettierRecommended,
  ],
  rules: {
    '@typescript-eslint/no-import-type-side-effects': 'error',
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
      },
    },
  },
  {
    extends: commonConfig,
    files: ['**/*.ts'],
  },
  {
    extends: [
      svelte.configs.recommended,
      commonConfig,
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
    extends: [json.configs.recommended, prettierRecommended],
    files: ['**/*.json'],
    language: 'json/json',
    rules: { 'json/sort-keys': ['error', 'asc', { natural: true }] },
  },
  {
    extends: [
      yml.configs.recommended,
      prettierRecommended,
      yml.configs.prettier,
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
