<script lang="ts">
  import { getTestId } from 'utilities';
  import Graduations from 'Graduations.svelte';
  import ClockHands from 'ClockHands.svelte';
</script>

<div
  class="grid h-screen place-content-center dark:bg-zinc-800"
  data-testid={getTestId('clock-face')}
>
  <svg viewBox="0 0 200 200" class="h-[95vmin]">
    <g class="translate-1/2">
      <circle class="fill-none stroke-zinc-600 dark:stroke-zinc-200" r="98" />
      <Graduations />
    </g>
    <g class="translate-1/2">
      <ClockHands />
    </g>
  </svg>
</div>
