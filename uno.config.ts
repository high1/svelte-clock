import { defineConfig } from 'unocss';
import { colors } from 'unocss/preset-mini';

const slice = (hex: `#${string}`, start: number) =>
  parseInt(hex.slice(start, start + 2), 16);

const hexToRgb = (
  hex: `#${string}`,
): [red: number, blue: number, green: number] => [
  slice(hex, 1),
  slice(hex, 3),
  slice(hex, 5),
];

const hexColors: Record<'svelte', `#${string}`> = {
  svelte: '#ff3e00',
};

const rgbColors = Object.fromEntries(
  Object.entries(hexColors).map(([color, hex]) => [color, hexToRgb(hex)]),
);

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
