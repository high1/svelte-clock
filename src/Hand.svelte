<script lang="ts">
  type $$Props = {
    length: number;
    limit?: number;
    stationary?: boolean;
    class?: string;
  } & Omit<svelte.JSX.SVGProps<SVGLineElement>, 'class'>;

  export let length: number;
  export let limit = 94;
  export let stationary = false;
  let clazz = '';
  export { clazz as class };
</script>

<line
  {...stationary && { y1: length - limit }}
  y2={-(stationary ? limit : length)}
  {...$$restProps}
  class={`stroke-cap-round ${clazz}`}
/>
