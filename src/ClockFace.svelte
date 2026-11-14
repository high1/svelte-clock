<script lang="ts">
  import ClockHands from '#src/ClockHands.svelte';
  import { clockFaceId } from '#src/common';
  import Graduations from '#src/Graduations.svelte';
  import ThemeToggle from '#src/ThemeToggle.svelte';
  import { getTimeZone, getTimeZones, startClock } from '#src/time.svelte';
  import TimezonePicker from '#src/TimezonePicker.svelte';
  import { getTestId } from '#src/utilities';

  const owner = Symbol();

  $effect(() => startClock(owner));

  let currentZone = $state(getTimeZone());
  const zones = getTimeZones();
</script>

<div
  class="flex flex-col items-center gap-2 px-2 block-dvh dark:bg-zinc-800"
  data-testid={getTestId(clockFaceId)}
>
  <TimezonePicker
    id="clock-timezone"
    {zones}
    value={currentZone}
    onchange={(zone: string) => {
      currentZone = zone;
    }}
    class="inline-full max-inline-80"
  />
  <ThemeToggle />
  <svg viewBox="0 0 200 200" class="size-full grow" role="img">
    <title>Clock</title>
    <image class="translate-5/12 block-1/6 inline-1/6" href="logo.svg" />
    <g class="translate-1/2">
      <circle class="fill-none stroke-zinc-600 dark:stroke-zinc-200" r="98" />
      <Graduations />
    </g>
    <g class="translate-1/2">
      <ClockHands zone={currentZone} />
    </g>
  </svg>
</div>
