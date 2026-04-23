<script lang="ts">
  import Graduation from '#src/ClockLine.svelte';
  import { clockGraduationId, rotate, seconds } from '#src/common';
  import { getTestId } from '#src/utilities';
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
    data-testid={getTestId(`${clockGraduationId}-${index}`)}
  />
{/each}
