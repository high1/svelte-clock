import globals from 'globals';
import eslint from '@eslint/js';
import { includeIgnoreFile } from '@eslint/compat';
import { defineConfig, globalIgnores } from 'eslint/config';
import {
  configs as tseslintConfigs,
  parser as tseslintParser,
} from 'typescript-eslint';
import svelte from 'eslint-plugin-svelte';
import svelteParser from 'svelte-eslint-parser';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import jsonc from 'eslint-plugin-jsonc';
import yml from 'eslint-plugin-yml';
import { importX } from 'eslint-plugin-import-x';
import stylistic from '@stylistic/eslint-plugin';
import html from '@html-eslint/eslint-plugin';
import { fileURLToPath } from 'node:url';

export default defineConfig(
  eslint.configs.recommended,
  tseslintConfigs.strictTypeChecked,
  tseslintConfigs.stylisticTypeChecked,
  svelte.configs['flat/recommended'],
  // @ts-expect-error Type 'undefined' is not assignable to type '(string | string[])[]'.ts(2345)
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
  stylistic.configs.customize({
    semi: true,
    jsx: false,
  }),
  prettierRecommended,
  svelte.configs['flat/prettier'],
  includeIgnoreFile(fileURLToPath(new URL('.gitignore', import.meta.url))),
  globalIgnores(['pnpm-lock.yaml']),
  {
    languageOptions: {
      parser: tseslintParser,
      parserOptions: {
        sourceType: 'module',
        extraFileExtensions: ['.svelte'],
        projectService: {
          allowDefaultProject: ['eslint.config.mjs'],
        },
        tsconfigRootDir: import.meta.dirname,
      },
      globals: globals.browser,
    },
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
  },
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: tseslintParser,
      },
    },
  },
  {
    files: ['**/*.html'],
    ...html.configs['flat/recommended'],
    rules: {
      ...html.configs['flat/recommended'].rules,
      '@html-eslint/indent': ['error', 2],
      '@html-eslint/require-closing-tags': ['error', { selfClosing: 'always' }],
      '@html-eslint/no-extra-spacing-attrs': [
        'error',
        { enforceBeforeSelfClose: true },
      ],
      '@html-eslint/attrs-newline': 'off',
    },
  },
  jsonc.configs['flat/recommended-with-jsonc'],
  jsonc.configs['flat/prettier'],
  yml.configs['flat/recommended'],
  yml.configs['flat/prettier'],
  {
    files: ['**/*.{html,json,yml,yaml}'],
    ...tseslintConfigs.disableTypeChecked,
  },
);
