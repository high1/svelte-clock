<script lang="ts">
  import type { SVGAttributes } from 'svelte/elements';

  interface $$Props extends SVGAttributes<SVGLineElement> {
    length: number;
    limit?: number;
    stationary?: boolean;
  }

  export let length: number;
  export let limit = 94;
  export let stationary = false;
</script>

<line
  stroke-linecap="round"
  y1={stationary ? length - limit : undefined}
  y2={-(stationary ? limit : length)}
  {...$$restProps}
/>
