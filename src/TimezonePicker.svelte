<script lang="ts">
  interface Props {
    id: string;
    onchange: (zone: string) => void;
    value: string;
    zones: string[];
  }

  let { id, onchange, value, zones }: Props = $props();

  let open = $state(false);
  let query = $state('');
  let activeIndex = $state(0);
  let placement = $state<'above' | 'below'>('below');

  let root = $state<HTMLDivElement>();
  let trigger = $state<HTMLButtonElement>();
  let listbox = $state<HTMLDivElement>();

  // Space around the trigger, captured in openPicker() before the popup exists,
  // so nothing the popup does on mount can skew the placement decision.
  let roomAbove = 0;
  let roomBelow = 0;

  const listboxId = $derived(`${id}-listbox`);

  function optionId(index: number): string {
    return `${listboxId}-option-${index}`;
  }

  function zoneLabel(zone: string): string {
    return zone.slice(zone.lastIndexOf('/') + 1).replaceAll('_', ' ');
  }

  function zoneRegion(zone: string): string {
    const separator = zone.indexOf('/');
    return separator === -1 ? 'Other' : zone.slice(0, separator);
  }

  const normalize = (text: string) => text.replaceAll('_', ' ').toLowerCase();

  const groups = $derived.by(() => {
    const search = normalize(query.trim());
    const matches = search
      ? zones.filter((zone) => normalize(zone).includes(search))
      : zones;

    // Number items after grouping, so an index is always the item's position
    // on screen, whatever order `zones` arrives in.
    let index = 0;

    return Array.from(Map.groupBy(matches, zoneRegion), ([region, items]) => ({
      items: items.map((zone) => ({ index: index++, zone })),
      region,
    }));
  });

  const options = $derived(
    groups.flatMap((group) => group.items.map((item) => item.zone)),
  );

  const activeOptionId = $derived(
    options[activeIndex] === undefined ? undefined : optionId(activeIndex),
  );

  function centerActiveOnMount(node: HTMLElement) {
    scrollToActive(node, true);
  }

  function choose(zone: string) {
    onchange(zone);
    closePicker(true);
  }

  function closePicker(restoreFocus = false) {
    open = false;

    if (restoreFocus) {
      trigger?.focus();
    }
  }

  // Actions run once when their element mounts (and don't track state),
  // so the popup focuses its input and centers the selection on open.
  function focusOnMount(node: HTMLElement) {
    // The picker places itself; the browser shouldn't also scroll the page.
    node.focus({ preventScroll: true });
    // node.focus();
  }

  function handleDocumentPointerDown(event: PointerEvent) {
    if (open && event.target instanceof Node && !root?.contains(event.target)) {
      closePicker();
    }
  }

  function handleSearchInput() {
    activeIndex = 0;

    if (listbox) {
      listbox.scrollTop = 0;
    }
  }

  function handleSearchKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        move(1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        move(-1);
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
    if (options.length === 0) {
      return;
    }

    activeIndex = Math.min(
      Math.max(activeIndex + delta, 0),
      options.length - 1,
    );
    scrollToActive(listbox);
  }

  function openPicker() {
    if (trigger) {
      const { bottom, top } = trigger.getBoundingClientRect();

      roomAbove = top;
      roomBelow = window.innerHeight - bottom;
    }

    query = '';
    open = true;
    activeIndex = Math.max(options.indexOf(value), 0);
  }

  // Open above the trigger when the popup doesn't fit below and there is more
  // room above. Only the popup's own height is measured here.
  function placePopup(node: HTMLElement) {
    // Popup height plus the gap to the trigger and some space to the viewport edge.
    const needed = node.offsetHeight + 16;

    placement = roomBelow < needed && roomAbove > roomBelow ? 'above' : 'below';
  }

  function scrollToActive(list: HTMLElement | undefined, center = false) {
    const option = list?.querySelector<HTMLElement>(
      `[data-index="${activeIndex}"]`,
    );

    if (!list || !option) {
      return;
    }

    if (center) {
      // Set scrollTop directly: scrollIntoView({ block: 'center' }) would also
      // scroll the page itself. The browser clamps scrollTop to a valid range.
      const optionTop =
        option.getBoundingClientRect().top -
        list.getBoundingClientRect().top -
        list.clientTop +
        list.scrollTop;

      list.scrollTop =
        optionTop - (list.clientHeight - option.offsetHeight) / 2;
    } else {
      option.scrollIntoView({ block: 'nearest' });
    }
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
  onfocusout={(e) => {
    const next = e.relatedTarget;
    if (next instanceof Node && !root?.contains(next)) closePicker();
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
    class="flex w-full min-w-0 items-center justify-between gap-3 rounded border border-gray-300 bg-white px-3 py-2 text-left text-gray-900 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
  >
    <span class="truncate">{zoneLabel(value)}</span>
    <span aria-hidden="true">{open ? '▴' : '▾'}</span>
  </button>

  {#if open}
    <!-- When above, the order is reversed so the input stays next to the trigger
         while the list grows and shrinks (DOM order is unchanged). -->
    <div
      use:placePopup
      class={`absolute left-0 z-50 flex w-full rounded border border-gray-300 bg-white text-gray-900 shadow-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 ${
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
        class={`w-full border-gray-200 bg-white px-3 py-2 text-gray-900 outline-none placeholder:text-gray-400 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-400 ${
          placement === 'above' ? 'border-t' : 'border-b'
        }`}
      />

      <div
        bind:this={listbox}
        use:centerActiveOnMount
        id={listboxId}
        role="listbox"
        aria-label="Timezones"
        class="max-h-80 overflow-y-auto p-1"
      >
        {#each groups as group (group.region)}
          <div role="group" aria-label={group.region}>
            <div
              class="px-3 py-1 text-xs font-semibold text-gray-500 dark:text-zinc-400"
            >
              {group.region}
            </div>

            {#each group.items as item (item.zone)}
              <button
                id={optionId(item.index)}
                data-index={item.index}
                type="button"
                role="option"
                tabindex="-1"
                aria-selected={item.zone === value}
                onpointerdown={(event) => {
                  event.preventDefault();
                }}
                onpointermove={() => (activeIndex = item.index)}
                onclick={() => {
                  choose(item.zone);
                }}
                class={`flex w-full cursor-pointer items-center justify-between rounded px-3 py-2 text-left text-sm ${
                  item.index === activeIndex
                    ? 'bg-blue-100 dark:bg-zinc-700'
                    : ''
                }`}
              >
                <span>{zoneLabel(item.zone)}</span>

                {#if item.zone === value}
                  <span aria-hidden="true">✓</span>
                {/if}
              </button>
            {/each}
          </div>
        {:else}
          <p class="px-3 py-2 text-sm text-gray-500 dark:text-zinc-400">
            No matching timezones
          </p>
        {/each}
      </div>
    </div>
  {/if}
</div>
