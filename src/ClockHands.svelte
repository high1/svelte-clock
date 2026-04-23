<script lang="ts">
  import ClockHand from '#src/ClockLine.svelte';
  import { clockHourId, clockMinutedId, clockSecondId } from '#src/common';
  import { time } from '#src/time.svelte';
  import { getTestId } from '#src/utilities';

  $effect(() => {
    let frame = requestAnimationFrame(function loop() {
      time.update();
      frame = requestAnimationFrame(loop);
    });
    return () => {
      cancelAnimationFrame(frame);
    };
  });
</script>

<ClockHand
  transform={time.subsecond}
  class="stroke-zinc-200 stroke-3 dark:stroke-zinc-600"
  length={82}
  data-testid={getTestId('clock-subsecond')}
/>
<ClockHand
  transform={time.hour}
  class="stroke-zinc-600 stroke-4 dark:stroke-zinc-200"
  length={46}
  data-testid={getTestId(clockHourId)}
/>
<ClockHand
  transform={time.minute}
  class="stroke-zinc-400 stroke-3"
  length={64}
  data-testid={getTestId(clockMinutedId)}
/>
<ClockHand
  transform={time.second}
  class="stroke-svelte stroke-2"
  length={76}
  data-testid={getTestId(clockSecondId)}
/>
