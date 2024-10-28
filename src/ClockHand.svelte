<script lang="ts">
  import type { SVGAttributes } from 'svelte/elements';

  interface Props extends SVGAttributes<SVGLineElement> {
    length: number;
    limit?: number;
    graduation?: boolean;
  }

  let { length, limit = 94, graduation = false, ...rest }: Props = $props();
</script>

<line
  stroke-linecap="round"
  y1={graduation ? length - limit : undefined}
  y2={-(graduation ? limit : length)}
  {...rest}
/>
