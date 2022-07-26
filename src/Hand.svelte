<script lang="ts">
  interface $$Props extends svelte.JSX.SVGProps<SVGLineElement> {
    length: number;
    limit?: number;
    stationary?: boolean;
  }
  
  export let length = 0;
  export let limit = 94;
  export let stationary = false;
</script>

<line
  {...stationary && { y1: length - limit }}
  y2={-(stationary ? limit : length)}
  {...$$restProps}
  class={`stroke-cap-round ${$$props.class}`}
/>
