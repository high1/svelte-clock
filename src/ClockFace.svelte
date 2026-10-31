<script lang="ts">
  import ClockHands from '#src/ClockHands.svelte';
  import { clockFaceId } from '#src/common';
  import Graduations from '#src/Graduations.svelte';
  import { startClock, timeZones } from '#src/time.svelte';
  import TimezonePicker from '#src/TimezonePicker.svelte';
  import { getTestId } from '#src/utilities';

  $effect(() => startClock());

  let currentZone = $state(Intl.DateTimeFormat().resolvedOptions().timeZone);
</script>

<div
  class="grid h-screen place-content-center dark:bg-zinc-800"
  data-testid={getTestId(clockFaceId)}
>
  <svg viewBox="0 0 200 200" class="h-[95vmin]" role="img">
    <title>Clock</title>
    <image class="size-1/6 translate-5/12" href="logo.svg" />
    <g class="translate-1/2">
      <circle class="fill-none stroke-zinc-600 dark:stroke-zinc-200" r="98" />
      <Graduations />
    </g>
    <g class="translate-1/2">
      <ClockHands zone={currentZone} />
    </g>
  </svg>
  <div class="flex justify-center">
    <TimezonePicker
      id="clock-timezone"
      zones={timeZones}
      value={currentZone}
      onchange={(zone: string) => {
        currentZone = zone;
      }}
    />
  </div>
</div>

<!-- How TimezonePicker.svelte works
1. The core idea

It’s a searchable dropdown where focus never leaves the search input while the popup is open. The input has the keyboard focus, and the component keeps a number, activeIndex, that says which option is highlighted. Arrow keys change that number, Enter picks the highlighted option, and aria-activedescendant tells screen readers which option is current.

Everything else follows from that choice. It’s the standard ARIA combobox pattern, and it explains why the options are never tabbed into and why clicking an option must not steal focus from the input.

The component is also controlled. The parent owns the selected timezone: it passes value in and gets onchange(zone) back. The picker never stores the selection itself.

2. State and data flow

The component works as a pipeline: a small amount of state at the start, and everything else derived from it.

State (things that change over time)

open: is the popup showing.
query: what’s typed in the search box.
activeIndex: the highlighted option’s position.
root, trigger, listbox: DOM element references, used for outside-click detection, focus restoration and scrolling.

Derived (recomputed automatically, never set by hand)

zones + query  →  groups  →  options  →  activeOptionId
                                  ↑
                             activeIndex
groups: filter, number, group
Filter. The query and each zone go through normalize, which lowercases and turns _ into spaces. So new york matches America/New_York, and so does america, because the whole id is searched, region included. An empty query keeps everything.
Number. Each match becomes { index, zone }, where index is its position in the filtered list.
Group. Map.groupBy buckets entries by region, the text before the first /. Zones without a slash, like UTC, go in Other.

The comment above groups carries an important assumption. The index is the position in the filtered list, but what the user sees is the grouped list. Those two orders are identical only if zones is already sorted by region. Your Intl.supportedValuesOf('timeZone') list is sorted alphabetically, so every region is contiguous. UTC comes first and forms its own Other group. If that assumption broke, arrow keys would jump around visually.

That precondition is what lets us avoid a separate running counter: the index assigned before grouping is already the on-screen position.

options, activeOptionId

options is just the zone names flattened out of groups, in display order. It’s the list that activeIndex points into. activeOptionId converts activeIndex to a DOM id, or undefined if nothing is highlighted, for aria-activedescendant.

3. Lifecycle of one interaction
Opening

openPicker() does three things:

ts
query = '';
open = true;
activeIndex = Math.max(options.indexOf(value), 0);

It clears the old search, shows the popup, and highlights the currently selected zone, falling back to the first option if value isn’t in the list. Reading options right after changing query is safe because derived values recompute on read when their inputs have changed, so it sees the cleared query and the full list.

Highlighting the selected zone is the heart of the original bug fix. Before, activeIndex was always reset to 0, so the list always scrolled to the top.

What happens when the popup mounts

Two small actions run once, when their element is created:

focusOnMount on the input focuses it.
centerActiveOnMount on the listbox scrolls the highlighted option into the middle of the list.

I used actions instead of waiting with tick() because they tie the behavior to the element’s existence instead of to timing. By the time an action runs, the element and its children are in the DOM. Actions also don’t track reactive state, so reading activeIndex inside doesn’t cause them to re-run.

Typing

bind:value updates query, which recomputes groups and options. handleSearchInput then resets the highlight to the first result and the scroll position to the top, since the list just changed under it.

Navigating

ArrowDown and ArrowUp call move(±1), which clamps activeIndex to the valid range and then scrolls to keep the highlighted option visible. Hovering also sets activeIndex (onpointermove), so mouse and keyboard share one highlight.

Choosing

choose(zone) calls onchange(zone), then closes the popup and returns focus to the trigger. Enter does this for the highlighted option, and clicking does it for the clicked one.

Closing
Escape: closes and returns focus to the trigger.
Tab: closes and lets focus move on naturally.
Pressing outside: a document-level pointerdown listener (<svelte:document>) closes the popup if the press landed outside root.
Trigger click: toggles.
4. Scrolling: two behaviors, deliberately different

scrollToActive finds the option with [data-index="…"], scoped to the list so no id escaping is needed. Then it has two modes.

Center (on open). It sets list.scrollTop directly, using the option’s offsetTop. The listbox has the relative class so that it’s the option’s offsetParent, and offsetTop is measured from the same edge scrollTop uses. That makes the arithmetic simple: put the option’s midpoint at the list’s visible midpoint. The first and last options can’t be centered, because the browser clamps scrollTop.

I avoided scrollIntoView({ block: 'center' }) here because it also scrolls the page and any other scrollable ancestor to satisfy the centering. On a scrollable page the whole page would jump when you open the picker.

Nearest (during arrow navigation). It uses scrollIntoView({ block: 'nearest' }), which scrolls the minimum distance needed, and nothing if the option is already visible. This is the behavior you want while moving through a list. The only side effect is that the highlighted row lands flush with the edge, which is the cosmetic detail scroll-py-1 would adjust if you want it.

The two modes follow a real difference. On open, the list should settle in a known, nice position. While navigating, it should move as little as possible.

5. Event handling: why handlers are split the way they are
Trigger key handler: only opens the popup on ArrowUp or ArrowDown. Enter and Space work natively because it’s a button.
Search key handler: owns everything while the popup is open, because focus is in the input. That includes Enter, which calls preventDefault so it can’t submit a surrounding form.
Home and End are not handled. In an editable combobox, those keys should move the text caret.
Options use onpointerdown with preventDefault. Without it, pressing an option would move focus from the input to the button, blurring the input before the click completes.
6. How the markup maps to the logic
Trigger: shows zoneLabel(value), the last segment of the id with underscores as spaces. It carries the id prop, aria-haspopup="listbox", aria-expanded, and aria-controls only while the listbox exists.
Input: role="combobox", with aria-controls pointing at the listbox and aria-activedescendant naming the highlighted option.
Listbox: role="listbox", containing one role="group" per region, labeled by the region name. A group header is visual only.
Each option: <button type="button" role="option" tabindex="-1">. ARIA in HTML allows option as a role on a button, so there’s no lint suppression and no custom key handling on the option. The tabindex="-1" keeps it out of the tab order. id and data-index come from the same item.index, which is how highlight, aria-activedescendant and scrolling all agree on one option. aria-selected marks the current value, and the ✓ is aria-hidden because aria-selected already says it.
Empty state: {:else} on the {#each} shows “No matching timezones”.
Keys: (group.region) and (item.zone) are unique because groupBy merges regions and your Set removes duplicate zones.
7. Invariants to keep in mind
activeIndex is always a position in options, and item.index is that same number. Break that and the highlight, ARIA and scrolling disagree.
zones must be sorted by region.
The listbox must stay relative, with no other positioned element between it and the options. Otherwise offsetTop is measured from the wrong parent and centering is off.
State changes happen only in event handlers (openPicker, move, and so on). The derived values never write state. -->
