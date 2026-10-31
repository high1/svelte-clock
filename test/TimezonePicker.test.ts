import { tick } from 'svelte';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';

import TimezonePicker from '#src/TimezonePicker.svelte';

const zones = [
  'Africa/Abidjan',
  'America/New_York',
  'Asia/Tokyo',
  'Europe/Berlin',
  'UTC',
];

const hasListbox = () => document.querySelector('[role="listbox"]') !== null;
const hasText = (text: string) => document.body.textContent.includes(text);

describe('<TimezonePicker />', () => {
  let onchange: ReturnType<typeof vi.fn<(zone: string) => void>>;

  beforeEach(() => {
    onchange = vi.fn<(zone: string) => void>();
  });

  test('opens the popup on trigger click and focuses the search input', async () => {
    const screen = await render(TimezonePicker, {
      props: { id: 'tz', onchange, value: 'UTC', zones },
    });

    await screen.getByRole('button').click();

    const input = screen.getByRole('combobox');
    expect(input.element()).toHaveFocus();
    expect(hasListbox()).toBe(true);
  });

  test('closes on Escape and restores focus to the trigger', async () => {
    const screen = await render(TimezonePicker, {
      props: { id: 'tz', onchange, value: 'UTC', zones },
    });

    const triggerLocator = screen.getByRole('button');
    const trigger = triggerLocator.element() as HTMLButtonElement;
    await triggerLocator.click();

    const input = screen.getByRole('combobox').element() as HTMLInputElement;
    input.dispatchEvent(
      new KeyboardEvent('keydown', { bubbles: true, key: 'Escape' }),
    );
    await tick();

    expect(hasListbox()).toBe(false);
    expect(document.activeElement).toBe(trigger);
  });

  test('closes on outside pointerdown without stealing focus', async () => {
    const screen = await render(TimezonePicker, {
      props: { id: 'tz', onchange, value: 'UTC', zones },
    });

    const triggerLocator = screen.getByRole('button');
    await triggerLocator.click();

    const outside = document.createElement('button');
    outside.textContent = 'outside';
    document.body.appendChild(outside);
    outside.focus();

    outside.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    await tick();

    expect(hasListbox()).toBe(false);
    expect(document.activeElement).toBe(outside);

    outside.remove();
  });

  test('closes on Tab without restoring focus', async () => {
    const screen = await render(TimezonePicker, {
      props: { id: 'tz', onchange, value: 'UTC', zones },
    });

    const triggerLocator = screen.getByRole('button');
    await triggerLocator.click();

    const input = screen.getByRole('combobox').element() as HTMLInputElement;
    input.dispatchEvent(
      new KeyboardEvent('keydown', { bubbles: true, key: 'Tab' }),
    );
    await tick();

    expect(hasListbox()).toBe(false);
  });

  test('ArrowDown and ArrowUp move the highlight and clamp within bounds', async () => {
    const screen = await render(TimezonePicker, {
      props: { id: 'tz', onchange, value: 'UTC', zones },
    });

    const triggerLocator = screen.getByRole('button');
    await triggerLocator.click();

    const input = screen.getByRole('combobox').element() as HTMLInputElement;

    input.dispatchEvent(
      new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowDown' }),
    );
    await tick();
    expect(input.getAttribute('aria-activedescendant')).toBe(
      'tz-listbox-option-4',
    );

    for (let i = 0; i < 4; i++) {
      input.dispatchEvent(
        new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowUp' }),
      );
      await tick();
    }
    expect(input.getAttribute('aria-activedescendant')).toBe(
      'tz-listbox-option-0',
    );

    input.dispatchEvent(
      new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowUp' }),
    );
    await tick();
    expect(input.getAttribute('aria-activedescendant')).toBe(
      'tz-listbox-option-0',
    );
  });

  test('Enter selects the highlighted option and restores focus', async () => {
    const screen = await render(TimezonePicker, {
      props: { id: 'tz', onchange, value: 'UTC', zones },
    });

    const triggerLocator = screen.getByRole('button');
    const trigger = triggerLocator.element() as HTMLButtonElement;
    await triggerLocator.click();

    const input = screen.getByRole('combobox').element() as HTMLInputElement;
    input.dispatchEvent(
      new KeyboardEvent('keydown', { bubbles: true, key: 'Enter' }),
    );
    await tick();

    expect(onchange).toHaveBeenCalledWith('UTC');
    expect(hasListbox()).toBe(false);
    expect(document.activeElement).toBe(trigger);
  });

  test('clicking an option selects it', async () => {
    const screen = await render(TimezonePicker, {
      props: { id: 'tz', onchange, value: 'UTC', zones },
    });

    await screen.getByRole('button').click();

    await screen.getByText('Tokyo').click();

    expect(onchange).toHaveBeenCalledWith('Asia/Tokyo');
  });

  test('search filters the available zones', async () => {
    const screen = await render(TimezonePicker, {
      props: { id: 'tz', onchange, value: 'UTC', zones },
    });

    await screen.getByRole('button').click();

    const input = screen.getByRole('combobox').element() as HTMLInputElement;
    input.value = 'tok';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await tick();

    expect(hasText('Tokyo')).toBe(true);
    expect(hasText('Berlin')).toBe(false);
  });

  test('shows the empty state when nothing matches', async () => {
    const screen = await render(TimezonePicker, {
      props: { id: 'tz', onchange, value: 'UTC', zones },
    });

    await screen.getByRole('button').click();

    const input = screen.getByRole('combobox').element() as HTMLInputElement;
    input.value = 'zzzzz';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await tick();

    expect(hasText('No matching timezones')).toBe(true);
  });

  test('opens above when there is not enough room below', async () => {
    const screen = await render(TimezonePicker, {
      props: { id: 'tz', onchange, value: 'UTC', zones },
    });

    const triggerLocator = screen.getByRole('button');
    const trigger = triggerLocator.element() as HTMLButtonElement;
    const vh = window.innerHeight;
    const rectSpy = vi.spyOn(trigger, 'getBoundingClientRect').mockReturnValue({
      bottom: vh - 5,
      height: 10,
      left: 0,
      right: 100,
      toJSON: () => ({}),
      top: vh - 15,
      width: 100,
      x: 0,
      y: vh - 15,
    });

    await triggerLocator.click();

    const popup = document.querySelector('[role="listbox"]')?.parentElement;
    expect(popup?.className).toContain('bottom-full');

    rectSpy.mockRestore();
  });
});

describe('<TimezonePicker /> additional branches', () => {
  const zones = [
    'Africa/Abidjan',
    'America/New_York',
    'Asia/Tokyo',
    'Europe/Berlin',
    'UTC',
  ];

  test('opens on ArrowDown when the trigger is focused', async () => {
    const onchange = vi.fn<(zone: string) => void>();
    const screen = await render(TimezonePicker, {
      props: { id: 'tz2', onchange, value: 'UTC', zones },
    });

    const trigger = screen.getByRole('button').element() as HTMLButtonElement;
    trigger.focus();
    trigger.dispatchEvent(
      new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowDown' }),
    );
    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(document.querySelector('[role="listbox"]')).not.toBeNull();
  });

  test('opens on ArrowUp when the trigger is focused', async () => {
    const onchange = vi.fn<(zone: string) => void>();
    const screen = await render(TimezonePicker, {
      props: { id: 'tz3', onchange, value: 'UTC', zones },
    });

    const trigger = screen.getByRole('button').element() as HTMLButtonElement;
    trigger.focus();
    trigger.dispatchEvent(
      new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowUp' }),
    );
    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(document.querySelector('[role="listbox"]')).not.toBeNull();
  });

  test('toggles closed when the trigger is clicked while open', async () => {
    const onchange = vi.fn<(zone: string) => void>();
    const screen = await render(TimezonePicker, {
      props: { id: 'tz4', onchange, value: 'UTC', zones },
    });

    await screen.getByRole('button').click();
    expect(document.querySelector('[role="listbox"]')).not.toBeNull();

    await screen.getByRole('button').click();
    expect(document.querySelector('[role="listbox"]')).toBeNull();
  });

  test('move does nothing when there are no options', async () => {
    const onchange = vi.fn<(zone: string) => void>();
    const screen = await render(TimezonePicker, {
      props: { id: 'tz5', onchange, value: 'UTC', zones },
    });

    await screen.getByRole('button').click();

    const input = screen.getByRole('combobox').element() as HTMLInputElement;
    input.value = 'zzzzz';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await tick();

    const before = input.getAttribute('aria-activedescendant');
    input.dispatchEvent(
      new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowDown' }),
    );
    await tick();

    expect(input.getAttribute('aria-activedescendant')).toBe(before);
  });

  test('Enter does nothing when there are no options', async () => {
    const onchange = vi.fn<(zone: string) => void>();
    const screen = await render(TimezonePicker, {
      props: { id: 'tz6', onchange, value: 'UTC', zones },
    });

    await screen.getByRole('button').click();

    const input = screen.getByRole('combobox').element() as HTMLInputElement;
    input.value = 'zzzzz';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await tick();

    input.dispatchEvent(
      new KeyboardEvent('keydown', { bubbles: true, key: 'Enter' }),
    );
    await tick();

    expect(onchange).not.toHaveBeenCalled();
  });

  test('closes the popup on window resize', async () => {
    const onchange = vi.fn<(zone: string) => void>();
    const screen = await render(TimezonePicker, {
      props: { id: 'tz7', onchange, value: 'UTC', zones },
    });

    await screen.getByRole('button').click();
    expect(document.querySelector('[role="listbox"]')).not.toBeNull();

    window.dispatchEvent(new Event('resize'));
    await tick();

    expect(document.querySelector('[role="listbox"]')).toBeNull();
  });

  test('ignores pointerdown outside while closed', async () => {
    const onchange = vi.fn<(zone: string) => void>();
    await render(TimezonePicker, {
      props: { id: 'tz8', onchange, value: 'UTC', zones },
    });

    const outside = document.createElement('button');
    outside.textContent = 'outside';
    document.body.appendChild(outside);

    outside.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    await tick();

    expect(document.querySelector('[role="listbox"]')).toBeNull();

    outside.remove();
  });
});

describe('<TimezonePicker /> document pointerdown', () => {
  const zones = [
    'Africa/Abidjan',
    'America/New_York',
    'Asia/Tokyo',
    'Europe/Berlin',
    'UTC',
  ];

  test('closes via document pointerdown when focus stays in the input', async () => {
    const onchange = vi.fn<(zone: string) => void>();
    const screen = await render(TimezonePicker, {
      props: { id: 'tz9', onchange, value: 'UTC', zones },
    });

    await screen.getByRole('button').click();
    expect(document.querySelector('[role="listbox"]')).not.toBeNull();

    const outside = document.createElement('div');
    document.body.appendChild(outside);

    outside.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(document.querySelector('[role="listbox"]')).toBeNull();

    outside.remove();
  });
});
