import { defineConfig } from 'unocss';
import { colors } from 'unocss/preset-mini';

const rgbColors: Record<'svelte', [red: number, green: number, blue: number]> =
  {
    svelte: [255, 62, 0],
  };

export default defineConfig({
  preflights: [
    {
      getCSS: () => `
        :root {
          ${Object.entries(rgbColors)
            .map(([color, [red, green, blue]]) => [
              `--${color}: ${red} ${green} ${blue}`,
            ])
            .join(';')};
        }
      `,
    },
  ],
  theme: {
    colors: {
      gray: colors.zinc,
      ...Object.fromEntries(
        Object.keys(rgbColors).map((color) => [
          color,
          `rgb(var(--${color}) / %alpha)`,
        ]),
      ),
    },
  },
});
