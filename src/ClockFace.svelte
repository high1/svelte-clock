<script lang="ts">
  import { onMount } from 'svelte';
  import { getTestId } from 'utilities';
  import ClockHand from 'ClockHand.svelte';

  const base = 60,
    getSecondsSinceMidnight = (): number =>
      (Date.now() - new Date().setHours(0, 0, 0, 0)) / 1000,
    rotate = (rotate: number, fractionDigits = 1) =>
      `rotate(${(rotate * 360).toFixed(fractionDigits)})`;

  let time = getSecondsSinceMidnight();

  $: subsecond = rotate(time % 1, 0);
  $: second = rotate((time % base) / base);
  $: minute = rotate(((time / base) % base) / base);
  $: hour = rotate(((time / base / base) % (base / 5)) / (base / 5));

  onMount(() => {
    let frame = requestAnimationFrame(function loop() {
      time = getSecondsSinceMidnight();
      frame = requestAnimationFrame(loop);
    });
    return () => {
      cancelAnimationFrame(frame);
    };
  });
</script>

<div
  class="grid h-screen place-content-center @dark:bg-gray-800"
  data-testid={getTestId('clock-face')}
>
  <svg viewBox="0 0 200 200" class="h-95vmin">
    <g class="translate-1/2">
      <circle class="fill-none stroke-gray-600 @dark:stroke-gray-200" r="98" />
      {#each { length: base } as _, index}
        {@const isHour = index % 5 === 0}
        <ClockHand
          transform={rotate(index / base, 0)}
          class={isHour
            ? 'stroke-2 stroke-gray-600 @dark:stroke-gray-200'
            : 'stroke-gray-200 @dark:stroke-gray-600'}
          length={isHour ? 6 : 2.5}
          stationary
        />
      {/each}
    </g>
    <g class="translate-1/2">
      <ClockHand
        transform={subsecond}
        class="stroke-3 stroke-gray-200 @dark:stroke-gray-600"
        length={82}
      />
      <ClockHand
        transform={hour}
        class="stroke-gray-600 @dark:stroke-gray-200 stroke-4"
        length={46}
      />
      <ClockHand
        transform={minute}
        class="stroke-3 stroke-gray-400"
        length={64}
      />
      <ClockHand
        transform={second}
        class="stroke-2 stroke-svelte"
        length={76}
      />
    </g>
  </svg>
</div>
