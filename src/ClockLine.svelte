<script lang="ts">
  import type { SVGAttributes } from 'svelte/elements';

  interface Props extends SVGAttributes<SVGLineElement> {
    graduation?: true;
    length: number;
    limit?: number;
  }

  let { graduation, length, limit = 94, ...rest }: Props = $props();
</script>

<line
  stroke-linecap="round"
  y1={graduation && length - limit}
  y2={-(graduation ? limit : length)}
  {...rest}
/>
