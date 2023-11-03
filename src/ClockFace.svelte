<script lang="ts">
  import { onMount } from 'svelte';
  import ClockHand from 'ClockHand.svelte';

  const length = 60;

  const getSecondsSinceMidnight = (): number =>
    (Date.now() - new Date().setHours(0, 0, 0, 0)) / 1000;
  let time = getSecondsSinceMidnight();

  const rotate = (rotate: number, fractionDigits = 1) =>
    `rotate(${(rotate * 360).toFixed(fractionDigits)})`;
  $: subsecond = rotate(time % 1, 0);
  $: second = rotate((time % 60) / 60);
  $: minute = rotate(((time / 60) % 60) / 60);
  $: hour = rotate(((time / 60 / 60) % 12) / 12);

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

<div class="grid h-screen place-content-center @dark:bg-gray-800">
  <svg viewBox="0 0 200 200" class="h-95vmin">
    <g class="translate-1/2">
      <circle class="fill-none stroke-gray-600 @dark:stroke-gray-200" r="98" />
      {#each { length } as _, index}
        {@const isHour = index % 5 === 0}
        <ClockHand
          transform={rotate(index / length, 0)}
          class={isHour
            ? 'stroke-gray-600 stroke-2 @dark:stroke-gray-200'
            : 'stroke-gray-200 @dark:stroke-gray-600'}
          length={isHour ? 6 : 2.5}
          stationary
        />
      {/each}
    </g>
    <g class="translate-1/2">
      <ClockHand
        transform={subsecond}
        class="stroke-gray-200 stroke-3 @dark:stroke-gray-600"
        length={82}
      />
      <ClockHand
        transform={hour}
        class="stroke-gray-600 stroke-4 @dark:stroke-gray-200"
        length={46}
      />
      <ClockHand
        transform={minute}
        class="stroke-gray-400 stroke-3"
        length={64}
      />
      <ClockHand
        transform={second}
        class="stroke-svelte stroke-2"
        length={76}
      />
    </g>
  </svg>
</div>
