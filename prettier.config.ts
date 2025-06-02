import { type Config } from 'prettier';

export default {
  plugins: ['prettier-plugin-svelte', 'prettier-plugin-tailwindcss'],
  singleQuote: true,
} satisfies Config;
