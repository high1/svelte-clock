<script lang="ts">
  import Graduation from '@/ClockLine.svelte';
  import { rotate, seconds } from '@/common';
  import { getTestId } from '@/utilities';
</script>

{#each { length: seconds } as _, index (index)}
  {@const isHour = index % 5 === 0}
  <Graduation
    transform={rotate(index / seconds, 0)}
    class={isHour
      ? 'stroke-zinc-600 stroke-2 dark:stroke-zinc-200'
      : 'stroke-zinc-200 dark:stroke-zinc-600'}
    length={isHour ? 6 : 2.5}
    graduation
    data-testid={getTestId(`clock-graduation-${index}`)}
  />
{/each}
