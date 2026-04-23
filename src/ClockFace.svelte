<script lang="ts">
  import ClockHands from '#src/ClockHands.svelte';
  import { clockFaceId } from '#src/common';
  import Graduations from '#src/Graduations.svelte';
  import { getTestId } from '#src/utilities';
</script>

<div
  class="grid h-screen place-content-center dark:bg-zinc-800"
  data-testid={getTestId(clockFaceId)}
>
  <svg viewBox="0 0 200 200" class="h-[95vmin]">
    <image class="size-1/6 translate-5/12" href="logo.svg" />
    <g class="translate-1/2">
      <circle class="fill-none stroke-zinc-600 dark:stroke-zinc-200" r="98" />
      <Graduations />
    </g>
    <g class="translate-1/2">
      <ClockHands />
    </g>
  </svg>
</div>
