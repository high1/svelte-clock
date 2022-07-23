<script lang="ts">
  import { onMount } from 'svelte';
  import Hand from './Hand.svelte';

  const getSecondsSinceMidnight = (): number =>
    (Date.now() - new Date().setHours(0, 0, 0, 0)) / 1000;
  
  const rotate = (rotate: number, fixed: number = 1) =>
    `rotate(${(rotate * 360).toFixed(fixed)})`;
  
  let time = getSecondsSinceMidnight();
  const length = 60;

  $: subsecond = rotate(time % 1, 0);
  $: second = rotate((time % 60) / 60);
  $: minute = rotate(((time / 60) % 60) / 60);
  $: hour = rotate(((time / 60 / 60) % 12) / 12);

  onMount(() => {
	  let frame: number;

    const loop = () => {
      time = getSecondsSinceMidnight();
	    frame = requestAnimationFrame(loop);
	  };

	  loop();

	  return () => {
	    cancelAnimationFrame(frame);
	  };
  });  
</script>

<div class="flex items-center justify-center h-full @dark:bg-neutral-700">
  <svg viewBox="0 0 200 200" class="h-95vmin">
    <g class="translate-100px">
      <circle
        class="stroke-neutral-900 @dark:stroke-neutral-100 fill-none"
        r="99"
      />
      {#each Array(length) as  _, index }
        {@const isHour = index % 5 === 0}
          <Hand
            transform={`rotate(${(360 * index) / length})`}
            class={
              isHour
                ? 'stroke-neutral-800 @dark:stroke-neutral-200 stroke-width-2'
                : 'stroke-neutral-400 @dark:stroke-neutral-600'
            }
            length={isHour ? 7 : 3}
            stationary
          />
        {/each}
    </g>
    <g class="translate-100px">
      <Hand
        transform={subsecond}
        class="stroke-neutral-200 @dark:stroke-neutral-600 stroke-width-5 change-transform"
        length={83}
      />
      <Hand
        transform={hour}
        class="stroke-neutral-800 @dark:stroke-neutral-200 stroke-width-4"
        length={50}
      />
      <Hand
        transform={minute}
        class="stroke-neutral-800 @dark:stroke-neutral-200 stroke-width-3"
        length={70}
      />
      <Hand
        transform={second}
        class="stroke-red-500 stroke-width-2"
        length={77}
      />
    </g>
  </svg>
</div>