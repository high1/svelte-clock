<script lang="ts">
  import { getTestId } from 'utilities';
  import ClockHand from 'ClockHand.svelte';

  const base = 60;
  const long = base / 5;
  const getSecondsSinceMidnight = (): number =>
    (Date.now() - new Date().setHours(0, 0, 0, 0)) / 1000;
  const rotate = (rotate: number, fractionDigits = 1) =>
    `rotate(${(rotate * 360).toFixed(fractionDigits)})`;

  let time = $state(getSecondsSinceMidnight());
  let subsecond = $derived(rotate(time % 1, 0));
  let second = $derived(rotate((time % base) / base));
  let minute = $derived(rotate(((time / base) % base) / base));
  let hour = $derived(rotate(((time / base / base) % long) / long));

  $effect(() => {
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
  class="grid h-screen place-content-center dark:bg-zinc-800"
  data-testid={getTestId('clock-face')}
>
  <svg viewBox="0 0 200 200" class="h-[95vmin]">
    <g class="translate-1/2">
      <circle class="fill-none stroke-zinc-600 dark:stroke-zinc-200" r="98" />
      {#each { length: base } as _, index}
        {@const isHour = index % 5 === 0}
        <ClockHand
          transform={rotate(index / base, 0)}
          class={isHour
            ? 'stroke-2 stroke-zinc-600 dark:stroke-zinc-200'
            : 'stroke-zinc-200 dark:stroke-zinc-600'}
          length={isHour ? 6 : 2.5}
          graduation
          data-testid={getTestId(`clock-graduation-${index}`)}
        />
      {/each}
    </g>
    <g class="translate-1/2">
      <ClockHand
        transform={subsecond}
        class="stroke-3 stroke-zinc-200 dark:stroke-zinc-600"
        length={82}
        data-testid={getTestId('clock-subsecond')}
      />
      <ClockHand
        transform={hour}
        class="stroke-zinc-600 dark:stroke-zinc-200 stroke-4"
        length={46}
        data-testid={getTestId('clock-hour')}
      />
      <ClockHand
        transform={minute}
        class="stroke-3 stroke-zinc-400"
        length={64}
        data-testid={getTestId('clock-minute')}
      />
      <ClockHand
        transform={second}
        class="stroke-2 stroke-svelte"
        length={76}
        data-testid={getTestId('clock-second')}
      />
    </g>
  </svg>
</div>
