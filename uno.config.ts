import { defineConfig } from 'unocss';
import { colors } from 'unocss/preset-mini';

const getRgbColors = (colors: string[]) =>
  Object.fromEntries(
    colors.map((color) => [color, `rgb(var(--${color}) / %alpha)`]),
  );

export default defineConfig({
  preflights: [
    {
      getCSS: () => `
        :root {
          --svelte: 255 62 0;
        }
      `,
    },
  ],
  theme: {
    colors: {
      gray: colors.zinc,
      ...getRgbColors(['svelte']),
    },
  },
});
