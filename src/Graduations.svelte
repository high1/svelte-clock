<script lang="ts">
  import { getTestId } from 'utilities';
  import { base, rotate } from 'common';
  import Graduation from 'ClockLine.svelte';
</script>

{#each { length: base } as _, index (index)}
  {@const isHour = index % 5 === 0}
  <Graduation
    transform={rotate(index / base, 0)}
    class={isHour
      ? 'stroke-zinc-600 stroke-2 dark:stroke-zinc-200'
      : 'stroke-zinc-200 dark:stroke-zinc-600'}
    length={isHour ? 6 : 2.5}
    graduation
    data-testid={getTestId(`clock-graduation-${index}`)}
  />
{/each}
