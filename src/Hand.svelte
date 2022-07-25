<script lang="ts">
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
