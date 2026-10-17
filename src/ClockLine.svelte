<script lang="ts">
  import type { SVGAttributes } from 'svelte/elements';

  interface Props extends Omit<
    SVGAttributes<SVGLineElement>,
    'stroke-linecap' | 'y1' | 'y2'
  > {
    graduation?: true;
    length: number;
    limit?: number;
  }

  let { graduation, length, limit = 94, ...rest }: Props = $props();
</script>

<line
  {...rest}
  stroke-linecap="round"
  y1={graduation && length - limit}
  y2={-(graduation ? limit : length)}
/>
