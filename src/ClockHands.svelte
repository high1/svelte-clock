<script lang="ts">
  import { createClockAnimation } from '#src/clock-animation.svelte';
  import ClockHand from '#src/ClockLine.svelte';
  import {
    clockHourId,
    clockMinuteId,
    clockSecondId,
    rotate,
  } from '#src/common';
  import { createTime } from '#src/time.svelte';
  import { getTestId } from '#src/utilities';

  let { zone }: { zone: string } = $props();
  const time = createClockAnimation(createTime(() => zone));
</script>

<ClockHand
  transform={rotate(time.hour, 1)}
  class="stroke-zinc-600 stroke-4 dark:stroke-zinc-200"
  length={46}
  data-testid={getTestId(clockHourId)}
/>
<ClockHand
  transform={rotate(time.minute, 1)}
  class="stroke-zinc-400 stroke-3"
  length={64}
  data-testid={getTestId(clockMinuteId)}
/>
<ClockHand
  transform={rotate(time.second, 1)}
  class="stroke-svelte stroke-2"
  length={76}
  data-testid={getTestId(clockSecondId)}
/>
<ClockHand
  transform={rotate(time.subsecond, 0)}
  class="stroke-zinc-200 stroke-3 dark:stroke-zinc-600"
  length={82}
  data-testid={getTestId('clock-subsecond')}
/>
