import { afterEach, describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';

import ThemeToggle from '#src/ThemeToggle.svelte';

const MEDIA_QUERY = '(prefers-color-scheme: dark)';

function mockMediaQuery(initialMatches = false) {
  const listeners = new Map<string, (e: MediaQueryListEvent) => void>();
  const original = window.matchMedia.bind(window);

  const mediaQueryList = {
    addEventListener: (
      _type: string,
      cb: EventListenerOrEventListenerObject,
    ) => {
      listeners.set(MEDIA_QUERY, cb as (e: MediaQueryListEvent) => void);
    },
    addListener: () => undefined,
    dispatchEvent: () => false,
    matches: initialMatches,
    media: MEDIA_QUERY,
    onchange: null,
    removeEventListener: () => undefined,
    removeListener: () => undefined,
  };

  window.matchMedia = () => mediaQueryList;

  return {
    fire: (matches: boolean) =>
      listeners.get(MEDIA_QUERY)?.(
        new MediaQueryListEvent('change', { matches }),
      ),
    restore: () => {
      window.matchMedia = original;
    },
  };
}

describe('<ThemeToggle />', () => {
  afterEach(() => {
    localStorage.removeItem('theme');
    document.documentElement.classList.remove('dark', 'light');
  });

  test('toggles the theme class on the document element', async () => {
    const screen = await render(ThemeToggle);
    const initialHasDark = document.documentElement.classList.contains('dark');
    const initialHasLight =
      document.documentElement.classList.contains('light');

    await screen.getByRole('button').click();

    expect(document.documentElement.classList.contains('dark')).toBe(
      !initialHasDark,
    );
    expect(document.documentElement.classList.contains('light')).toBe(
      !initialHasLight,
    );
  });

  test('updates the theme when the system preference changes', async () => {
    const { fire, restore } = mockMediaQuery();

    try {
      await render(ThemeToggle);

      fire(true);

      expect(document.documentElement.classList.contains('dark')).toBe(true);
    } finally {
      restore();
    }
  });

  test('does not update the theme when a saved override exists', async () => {
    localStorage.setItem('theme', 'dark');
    const { fire, restore } = mockMediaQuery();

    try {
      await render(ThemeToggle);

      fire(true);

      expect(document.documentElement.classList.contains('dark')).toBe(false);
    } finally {
      restore();
    }
  });

  test('removes the saved theme on load when it matches the system preference', async () => {
    const systemWantsDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    localStorage.setItem('theme', systemWantsDark ? 'dark' : 'light');

    await render(ThemeToggle);

    expect(localStorage.getItem('theme')).toBeNull();
  });

  test('writes or clears the saved theme override based on the system preference', async () => {
    localStorage.removeItem('theme');
    const systemWantsDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    const screen = await render(ThemeToggle);

    await screen.getByRole('button').click();

    const nextIsDark = document.documentElement.classList.contains('dark');
    const savedTheme = localStorage.getItem('theme');

    expect(savedTheme).toBe(
      nextIsDark === systemWantsDark ? null : nextIsDark ? 'dark' : 'light',
    );
  });

  test('removes the saved theme when toggling back to the system preference', async () => {
    localStorage.removeItem('theme');
    const screen = await render(ThemeToggle);

    await screen.getByRole('button').click();
    expect(localStorage.getItem('theme')).not.toBeNull();

    await screen.getByRole('button').click();
    expect(localStorage.getItem('theme')).toBeNull();
  });

  test('keeps a saved theme override that differs from the system preference', async () => {
    const systemWantsDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    localStorage.setItem('theme', systemWantsDark ? 'light' : 'dark');

    await render(ThemeToggle);

    expect(localStorage.getItem('theme')).toBe(
      systemWantsDark ? 'light' : 'dark',
    );
  });

  test('writes a theme override when the toggled theme differs from the system preference', async () => {
    localStorage.removeItem('theme');
    const screen = await render(ThemeToggle);

    await screen.getByRole('button').click();

    expect(localStorage.getItem('theme')).not.toBeNull();
  });

  test('writes a light override when toggling to a light theme while the system prefers dark', async () => {
    const { restore } = mockMediaQuery(true);

    try {
      const screen = await render(ThemeToggle);

      await screen.getByRole('button').click();
      await screen.getByRole('button').click();

      expect(localStorage.getItem('theme')).toBe('light');
    } finally {
      restore();
    }
  });
});
