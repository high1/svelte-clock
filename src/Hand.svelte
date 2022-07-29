<script lang="ts">
  type $$Props = {
    length: number;
    limit?: number;
    stationary?: boolean;
  } & svelte.JSX.SVGProps<SVGLineElement>;

  export let length: number;
  export let limit = 94;
  export let stationary = false;
</script>

<line
  {...stationary && { y1: length - limit }}
  y2={-(stationary ? limit : length)}
  {...$$restProps}
  class={`stroke-cap-round ${$$props.class}`}
/>
