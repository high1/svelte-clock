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
  class:stroke-cap-round={true}
  y1={stationary ? length - limit : undefined}
  y2={-(stationary ? limit : length)}
  {...$$restProps}
/>
