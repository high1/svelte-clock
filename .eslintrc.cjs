module.exports = {
  root: true,
  ignorePatterns: ['dist/*'],
  overrides: [
    {
      files: ['*.svelte'],
      globals: {
        svelte: true,
      },
      parser: 'svelte-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
      extends: [
        'eslint:recommended',
        'plugin:svelte/recommended',
        'plugin:prettier/recommended',
        'plugin:svelte/prettier',
      ],
      env: {
        browser: true,
        es2022: true,
      },
      rules: {
        'no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^\\${2}(Props|Slots|Events)$',
          },
        ],
      },
    },
    {
      files: ['*.cjs', '*.mjs'],
      env: {
        browser: true,
        es2022: true,
        node: true,
      },
      extends: ['eslint:recommended', 'plugin:prettier/recommended'],
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:prettier/recommended',
      ],
      env: {
        browser: true,
        es2022: true,
        node: true,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
      },
      settings: {
        'import/resolver': {
          typescript: {},
        },
        'import/core-modules': ['uno.css'],
      },
    },
  ],
};
