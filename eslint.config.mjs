/* eslint-disable import-x/no-named-as-default-member */
import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginSvelte from 'eslint-plugin-svelte';
import svelteParser from 'svelte-eslint-parser';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintPluginJsonc from 'eslint-plugin-jsonc';
import eslintPluginYml from 'eslint-plugin-yml';
import eslintPluginImportX from 'eslint-plugin-import-x';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  ...eslintPluginSvelte.configs['flat/recommended'],
  eslintPluginImportX.flatConfigs.recommended,
  eslintPluginImportX.flatConfigs.typescript,
  eslintPluginPrettierRecommended,
  ...eslintPluginSvelte.configs['flat/prettier'],
  {
    ignores: ['coverage', 'dist', 'node_modules', '!**/.*', 'pnpm-lock.yaml'],
  },
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
    files: ['*.svelte', '**/*.svelte'],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
  ...eslintPluginJsonc.configs['flat/recommended-with-jsonc'],
  ...eslintPluginYml.configs['flat/recommended'],
  {
    files: ['**/*.{js,json,yml}'],
    ...tseslint.configs.disableTypeChecked,
  },
);
