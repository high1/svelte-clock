/* eslint-disable import-x/no-named-as-default-member */
import globals from 'globals';
import eslint from '@eslint/js';
import { includeIgnoreFile } from '@eslint/compat';
import { globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';
import eslintPluginSvelte from 'eslint-plugin-svelte';
import svelteParser from 'svelte-eslint-parser';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintPluginJsonc from 'eslint-plugin-jsonc';
import eslintPluginYml from 'eslint-plugin-yml';
import eslintPluginImportX from 'eslint-plugin-import-x';
import stylistic from '@stylistic/eslint-plugin';
import html from '@html-eslint/eslint-plugin';
import { fileURLToPath } from 'node:url';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  ...eslintPluginSvelte.configs['flat/recommended'],
  eslintPluginImportX.flatConfigs.recommended,
  eslintPluginImportX.flatConfigs.typescript,
  stylistic.configs.customize({
    semi: true,
    jsx: false,
  }),
  eslintPluginPrettierRecommended,
  ...eslintPluginSvelte.configs['flat/prettier'],
  includeIgnoreFile(fileURLToPath(new URL('.gitignore', import.meta.url))),
  globalIgnores(['pnpm-lock.yaml']),
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        sourceType: 'module',
        extraFileExtensions: ['.svelte'],
        projectService: {
          allowDefaultProject: ['eslint.config.mjs'],
        },
        tsconfigRootDir: import.meta.dirname,
      },
      globals: { ...globals.browser },
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
        parser: tseslint.parser,
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
  // @ts-expect-error Type 'undefined' is not assignable to type '(string | string[])[]'.ts(2345)
  ...eslintPluginJsonc.configs['flat/recommended-with-jsonc'],
  ...eslintPluginJsonc.configs['flat/prettier'],
  ...eslintPluginYml.configs['flat/recommended'],
  ...eslintPluginYml.configs['flat/prettier'],
  {
    files: ['**/*.{html,json,yml,yaml}'],
    ...tseslint.configs.disableTypeChecked,
  },
);
