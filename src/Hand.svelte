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
  class={`stroke-cap-round ${clazz}`}
  y1={stationary ? length - limit : undefined}
  y2={-(stationary ? limit : length)}
  {...$$restProps}
/>
