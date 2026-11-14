<script lang="ts">
  import type { Component } from 'svelte';

  import { onMount } from 'svelte';

  import Moon from '#src/Moon.svelte';
  import Sun from '#src/Sun.svelte';

  let isDark = $state(false);
  const title = $derived(`Switch to ${isDark ? 'light' : 'dark'} mode`);

  // Lazily created on first use (browser only — never during SSR).
  let mediaQuery: MediaQueryList | undefined;

  function getMediaQuery() {
    mediaQuery ??= window.matchMedia('(prefers-color-scheme: dark)');
    return mediaQuery;
  }

  onMount(() => {
    const mq = getMediaQuery();
    isDark = document.documentElement.classList.contains('dark');

    const savedTheme = () => localStorage.getItem('theme');

    const currentSaved = savedTheme();
    if (currentSaved && (currentSaved === 'dark') === mq.matches) {
      localStorage.removeItem('theme');
    }

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (!savedTheme()) {
        isDark = e.matches;
        document.documentElement.classList.toggle('dark', e.matches);
        document.documentElement.classList.toggle('light', !e.matches);
      }
    };

    mq.addEventListener('change', handleSystemThemeChange);

    return () => {
      mq.removeEventListener('change', handleSystemThemeChange);
    };
  });

  function toggleTheme() {
    const mq = getMediaQuery();
    const systemWantsDark = mq.matches;

    isDark = !isDark;

    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.classList.toggle('light', !isDark);

    if (isDark === systemWantsDark) {
      localStorage.removeItem('theme');
    } else {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }
  }
</script>

{#snippet icon(Icon: Component, active: boolean, exitClass: string)}
  <div
    class={[
      'absolute inset-0 block-5 inline-5 [&&]:motion-safe:transition-all',
      active
        ? 'scale-100 rotate-0 opacity-100'
        : `scale-50 opacity-0 ${exitClass}`,
    ]}
  >
    <Icon />
  </div>
{/snippet}

<button
  onclick={toggleTheme}
  class="group absolute inset-e-2 inset-bs-2 z-10 flex cursor-pointer items-center justify-center rounded-full border border-zinc-200 text-zinc-600 block-10 inline-10
  hover:text-zinc-900 focus:outline-none dark:border-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-100"
  {title}
  aria-label={title}
>
  <div
    class="relative block-5 inline-5 group-hover:rotate-10 motion-safe:transition-transform"
  >
    {@render icon(Sun, !isDark, 'rotate-90')}
    {@render icon(Moon, isDark, '-rotate-90')}
  </div>
</button>
