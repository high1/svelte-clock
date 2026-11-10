<script lang="ts">
  import { getTimezoneGroups, zoneLabel } from '#src/timezone-options';

  interface Props {
    class?: string;
    id: string;
    onchange: (zone: string) => void;
    value: string;
    /** Unique IANA timezone identifiers. */
    zones: readonly string[];
  }

  let { class: className = '', id, onchange, value, zones }: Props = $props();

  let open = $state(false);
  let query = $state('');
  let activeIndex = $state(0);
  let placement = $state<'above' | 'below'>('below');
  let openWidth = 0;

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
        moveTo(activeIndex + (event.key === 'ArrowDown' ? 1 : -1));
        break;

      case 'End':
        event.preventDefault();
        moveTo(options.length - 1);
        break;

      case 'Enter': {
        // IMEs use Enter to confirm composition; don't commit a selection then.
        // Safari can fire compositionend before the Enter keydown, by which
        // point isComposing is already false; verify on a real IME before
        // relying on it.
        if (event.isComposing) {
          break;
        }

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

      case 'Home':
        event.preventDefault();
        moveTo(0);
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

  function moveTo(index: number) {
    // Upper bound first, so an empty list leaves the index at 0.
    activeIndex = Math.max(Math.min(index, options.length - 1), 0);

    scrollToActive();
  }

  function openPicker() {
    query = '';
    activeIndex = Math.max(options.indexOf(value), 0);
    openWidth = window.innerWidth;
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
    scrollToActive(true);
  }

  function scrollToActive(center = false) {
    const option = getActiveOption();

    if (!option) {
      return;
    }

    // Option edges relative to the visible area of the list.
    const top =
      option.getBoundingClientRect().top - listBox.getBoundingClientRect().top;
    const bottom = top + option.offsetHeight - listBox.clientHeight;

    // Only the list scrolls. Center on open, otherwise move as little as needed.
    listBox.scrollTop += center
      ? top - (listBox.clientHeight - option.offsetHeight) / 2
      : Math.min(top, 0) + Math.max(bottom, 0);
  }
</script>

<svelte:document onpointerdown={handleDocumentPointerDown} />

<svelte:window
  onresize={() => {
    if (window.innerWidth !== openWidth) {
      closePicker();
    }
  }}
/>

<div
  bind:this={root}
  class={`relative${className ? ' ' + className : ''}`}
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
    class="flex w-full min-w-0 cursor-pointer items-center justify-between gap-3 rounded border border-zinc-300 px-3 py-2 text-left text-zinc-900 dark:border-zinc-600 dark:text-zinc-100"
  >
    <span class="truncate">{zoneLabel(value)}</span>
    <span aria-hidden="true">{open ? '▴' : '▾'}</span>
  </button>

  {#if open}
    <!-- When above, the order is reversed so the input stays next to the trigger
         while the list grows and shrinks (DOM order is unchanged). -->
    <div
      use:placePopup
      class={`absolute z-50 flex w-full rounded border border-zinc-300 bg-white text-zinc-900 shadow-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 ${
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
        class="max-h-80 overflow-y-auto overscroll-contain p-1"
      >
        {#each groups as { items, region } (region)}
          <div role="group" aria-label={region}>
            <div
              class="px-3 py-1 text-xs font-semibold text-zinc-500 dark:text-zinc-400"
            >
              {region}
            </div>

            {#each items as { index, zone } (zone)}
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
                onclick={() => {
                  choose(zone);
                }}
                class={`flex w-full cursor-pointer items-center justify-between rounded px-3 py-2 text-left text-sm ${
                  index === activeIndex
                    ? 'bg-zinc-200 ring-2 ring-zinc-900/40 ring-inset dark:bg-zinc-700 dark:ring-zinc-100/40'
                    : 'hover:bg-zinc-100 dark:hover:bg-zinc-700'
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
