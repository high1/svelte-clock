<script lang="ts">
  import { getTimezoneGroups, zoneLabel } from '#src/timezone-options';

  interface Props {
    id: string;
    onchange: (zone: string) => void;
    value: string;
    zones: readonly string[];
  }

  let { id, onchange, value, zones }: Props = $props();

  let open = $state(false);
  let query = $state('');
  let activeIndex = $state(0);
  let placement = $state<'above' | 'below'>('below');

  let root: HTMLDivElement;
  let trigger: HTMLButtonElement;
  let listBox: HTMLDivElement;

  const listboxId = $derived(`${id}-listbox`);

  const groups = $derived(getTimezoneGroups(zones, query));

  const options = $derived(
    groups.flatMap((group) => group.items.map((item) => item.zone)),
  );

  const activeOptionId = $derived(
    options[activeIndex] === undefined ? undefined : optionId(activeIndex),
  );

  function choose(zone: string) {
    onchange(zone);
    closePicker(true);
  }

  function closePicker(restoreFocus = false) {
    open = false;

    if (restoreFocus) {
      trigger.focus();
    }
  }

  function focusOnMount(node: HTMLElement) {
    node.focus({ preventScroll: true });
  }

  function getActiveOption() {
    return listBox.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`);
  }

  function handleDocumentPointerDown(event: PointerEvent) {
    if (open && event.target instanceof Node && !root.contains(event.target)) {
      closePicker();
    }
  }

  function handleSearchInput() {
    activeIndex = 0;
    listBox.scrollTop = 0;
  }

  function handleSearchKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp':
        event.preventDefault();
        move(event.key === 'ArrowDown' ? 1 : -1);
        break;

      case 'Enter': {
        event.preventDefault();

        const zone = options[activeIndex];

        if (zone !== undefined) {
          choose(zone);
        }

        break;
      }

      case 'Escape':
        event.preventDefault();
        closePicker(true);
        break;

      case 'Tab':
        closePicker();
        break;
    }
  }

  function handleTriggerClick() {
    if (open) {
      closePicker();
    } else {
      openPicker();
    }
  }

  function handleTriggerKeydown(event: KeyboardEvent) {
    if (!open && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
      event.preventDefault();
      openPicker();
    }
  }

  function move(delta: number) {
    // Upper bound first, so an empty list leaves the index at 0.
    activeIndex = Math.max(
      Math.min(activeIndex + delta, options.length - 1),
      0,
    );

    scrollToActive();
  }

  function openPicker() {
    query = '';
    activeIndex = Math.max(options.indexOf(value), 0);
    open = true;
  }

  function optionId(index: number): string {
    return `${listboxId}-option-${index}`;
  }

  function placePopup(node: HTMLElement) {
    const { bottom, top } = trigger.getBoundingClientRect();
    const { marginBottom, marginTop } = getComputedStyle(node);

    const roomAbove = top;
    const roomBelow = window.innerHeight - bottom;

    // Popup height plus its gap to the trigger. The margin sits on the top or
    // the bottom depending on the previous placement, so add both.
    const needed =
      node.offsetHeight + parseFloat(marginTop) + parseFloat(marginBottom);

    placement = roomBelow < needed && roomAbove > roomBelow ? 'above' : 'below';
  }

  function registerListbox(node: HTMLDivElement) {
    listBox = node;

    const option = getActiveOption();

    if (option) {
      node.scrollTop +=
        option.getBoundingClientRect().top -
        node.getBoundingClientRect().top -
        (node.clientHeight - option.offsetHeight) / 2;
    }
  }

  function scrollToActive() {
    const option = getActiveOption();

    if (!option) {
      return;
    }

    // Option edges relative to the visible area of the list.
    const top =
      option.getBoundingClientRect().top - listBox.getBoundingClientRect().top;
    const bottom = top + option.offsetHeight - listBox.clientHeight;

    // Scroll only the list, and only as far as needed.
    listBox.scrollTop += Math.min(top, 0) + Math.max(bottom, 0);
  }
</script>

<svelte:document onpointerdown={handleDocumentPointerDown} />

<svelte:window
  onresize={() => {
    closePicker();
  }}
/>

<div
  bind:this={root}
  class="relative w-80 max-w-full"
  onfocusout={(event) => {
    const next = event.relatedTarget;

    if (next instanceof Node && !root.contains(next)) {
      closePicker();
    }
  }}
>
  <button
    {id}
    bind:this={trigger}
    type="button"
    aria-haspopup="listbox"
    aria-expanded={open}
    aria-controls={open ? listboxId : undefined}
    onclick={handleTriggerClick}
    onkeydown={handleTriggerKeydown}
    class="flex w-full min-w-0 items-center justify-between gap-3 rounded border border-zinc-300 bg-white px-3 py-2 text-left text-zinc-900 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
  >
    <span class="truncate">{zoneLabel(value)}</span>
    <span aria-hidden="true">{open ? '▴' : '▾'}</span>
  </button>

  {#if open}
    <!-- When above, the order is reversed so the input stays next to the trigger
         while the list grows and shrinks (DOM order is unchanged). -->
    <div
      use:placePopup
      class={`absolute left-0 z-50 flex w-full rounded border border-zinc-300 bg-white text-zinc-900 shadow-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 ${
        placement === 'above'
          ? 'bottom-full mb-1 flex-col-reverse'
          : 'top-full mt-1 flex-col'
      }`}
    >
      <input
        use:focusOnMount
        bind:value={query}
        type="text"
        role="combobox"
        aria-label="Search timezones"
        aria-autocomplete="list"
        aria-expanded="true"
        aria-controls={listboxId}
        aria-activedescendant={activeOptionId}
        oninput={handleSearchInput}
        onkeydown={handleSearchKeydown}
        placeholder="Search timezones…"
        class={`w-full border-zinc-200 px-3 py-2 outline-none placeholder:text-zinc-400 dark:border-zinc-600 ${
          placement === 'above' ? 'border-t' : 'border-b'
        }`}
      />

      <div
        use:registerListbox
        id={listboxId}
        role="listbox"
        aria-label="Timezones"
        class="max-h-80 overflow-y-auto p-1"
      >
        {#each groups as group (group.region)}
          <div role="group" aria-label={group.region}>
            <div
              class="px-3 py-1 text-xs font-semibold text-zinc-500 dark:text-zinc-400"
            >
              {group.region}
            </div>

            {#each group.items as { index, zone } (zone)}
              <button
                id={optionId(index)}
                data-index={index}
                type="button"
                role="option"
                tabindex="-1"
                aria-selected={zone === value}
                onpointerdown={(event) => {
                  event.preventDefault();
                }}
                onpointermove={() => (activeIndex = index)}
                onclick={() => {
                  choose(zone);
                }}
                class={`flex w-full cursor-pointer items-center justify-between rounded px-3 py-2 text-left text-sm ${
                  index === activeIndex ? 'bg-blue-100 dark:bg-zinc-700' : ''
                }`}
              >
                <span>{zoneLabel(zone)}</span>

                {#if zone === value}
                  <span aria-hidden="true">✓</span>
                {/if}
              </button>
            {/each}
          </div>
        {:else}
          <p class="px-3 py-2 text-sm text-zinc-500 dark:text-zinc-400">
            No matching timezones
          </p>
        {/each}
      </div>
    </div>
  {/if}
</div>
