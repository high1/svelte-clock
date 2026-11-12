import { tick } from 'svelte';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';

import ClockHands from '#src/ClockHands.svelte';
import { clockHourId, clockMinuteId, clockSecondId } from '#src/common';
import { getTimeZone, now } from '#src/time.svelte';

// `now` is a module-level singleton, so every test starts from a known clock
// rather than inheriting whatever the previous test left behind.
const setTime = (hours = 0, minutes = 0, seconds = 0) => {
  vi.setSystemTime(new Date(2020, 0, 1, hours, minutes, seconds, 0));
  now.value = Date.now();
};

beforeEach(() => {
  setTime();
});

// Minute and second hands share the same domain: 0–59 units, 6° per unit.
const minuteSecondCases = [
  [0, 'rotate(0)'],
  [1, 'rotate(6)'],
  [15, 'rotate(90)'],
  [30, 'rotate(180)'],
  [59, 'rotate(354)'],
] as const;

describe('<ClockHands /> in a fixed zone', () => {
  test.each([
    [0, 'rotate(0)'],
    [3, 'rotate(90)'],
    [6, 'rotate(180)'],
    [11, 'rotate(330)'],
  ])('renders hour %i in UTC as %s', async (hours, transform) => {
    now.value = Date.UTC(2020, 0, 1, hours, 0, 0, 0);
    const screen = await render(ClockHands, { props: { zone: 'UTC' } });
    expect(
      screen.getByTestId(clockHourId).element().getAttribute('transform'),
    ).toBe(transform);
  });

  test('renders second 15 in UTC', async () => {
    now.value = Date.UTC(2020, 0, 1, 0, 0, 15, 0);
    const screen = await render(ClockHands, { props: { zone: 'UTC' } });
    expect(
      screen.getByTestId(clockSecondId).element().getAttribute('transform'),
    ).toBe('rotate(90)');
  });
});

describe('<ClockHands />', () => {
  test.each([
    [0, 'rotate(0)'],
    [1, 'rotate(30)'],
    [3, 'rotate(90)'],
    [6, 'rotate(180)'],
    [11, 'rotate(330)'],
    [12, 'rotate(0)'],
  ])('renders hour %i as %s', async (hours, transform) => {
    setTime(hours);
    const screen = await render(ClockHands, { props: { zone: getTimeZone() } });
    expect(
      screen.getByTestId(clockHourId).element().getAttribute('transform'),
    ).toBe(transform);
  });

  test.each(minuteSecondCases)(
    'renders minute %i as %s',
    async (minutes, transform) => {
      setTime(0, minutes);
      const screen = await render(ClockHands, { props: { zone: 'UTC' } });
      expect(
        screen.getByTestId(clockMinuteId).element().getAttribute('transform'),
      ).toBe(transform);
    },
  );

  test.each(minuteSecondCases)(
    'renders second %i as %s',
    async (seconds, transform) => {
      setTime(0, 0, seconds);
      const screen = await render(ClockHands, { props: { zone: 'UTC' } });
      expect(
        screen.getByTestId(clockSecondId).element().getAttribute('transform'),
      ).toBe(transform);
    },
  );
});

describe('<ClockHands /> zone change animation', () => {
  const start = Date.UTC(2020, 0, 1, 0, 0, 0, 0);

  test('animates the hour hand when the zone changes', async () => {
    now.value = start;
    const screen = await render(ClockHands, { props: { zone: 'UTC' } });

    expect(
      screen.getByTestId(clockHourId).element().getAttribute('transform'),
    ).toBe('rotate(0)');

    // Europe/Berlin is UTC+1, so the hour hand moves from 0° to 30°.
    await screen.rerender({ zone: 'Europe/Berlin' });
    await tick();

    // Mid-animation: the hand is between the old and the new position.
    now.value = start + 100;
    await tick();
    expect(
      screen.getByTestId(clockHourId).element().getAttribute('transform'),
    ).not.toBe('rotate(0)');
    expect(
      screen.getByTestId(clockHourId).element().getAttribute('transform'),
    ).not.toBe('rotate(30)');

    // Animation complete.
    now.value = start + 300;
    await tick();
    expect(
      screen.getByTestId(clockHourId).element().getAttribute('transform'),
    ).toBe('rotate(30)');
  });

  test('animates the minute hand when the zone changes', async () => {
    now.value = start;
    const screen = await render(ClockHands, { props: { zone: 'UTC' } });

    expect(
      screen.getByTestId(clockMinuteId).element().getAttribute('transform'),
    ).toBe('rotate(0)');

    // Asia/Kathmandu is UTC+5:45, so the minute hand moves from 0° to 270°.
    await screen.rerender({ zone: 'Asia/Kathmandu' });
    await tick();

    now.value = start + 100;
    await tick();
    expect(
      screen.getByTestId(clockMinuteId).element().getAttribute('transform'),
    ).not.toBe('rotate(0)');
    expect(
      screen.getByTestId(clockMinuteId).element().getAttribute('transform'),
    ).not.toBe('rotate(270)');

    now.value = start + 300;
    await tick();
    expect(
      screen.getByTestId(clockMinuteId).element().getAttribute('transform'),
    ).toBe('rotate(270)');
  });

  test('does not animate when switching between zones with the same offset', async () => {
    // France and Germany share the same DST rules (CET/CEST).
    // At 00:00 UTC both show 01:00 (CET, UTC+1 in January).
    now.value = start;
    const screen = await render(ClockHands, {
      props: { zone: 'Europe/Paris' },
    });

    expect(
      screen.getByTestId(clockHourId).element().getAttribute('transform'),
    ).toBe('rotate(30)');

    await screen.rerender({ zone: 'Europe/Berlin' });
    await tick();

    now.value = start + 300;
    await tick();
    expect(
      screen.getByTestId(clockHourId).element().getAttribute('transform'),
    ).toBe('rotate(30)');
  });

  test('redirects a minute-hand animation mid-flight', async () => {
    now.value = start;
    const screen = await render(ClockHands, { props: { zone: 'UTC' } });

    // Start animating toward Asia/Kathmandu (UTC+5:45) — minute hand moves.
    await screen.rerender({ zone: 'Asia/Kathmandu' });
    await tick();

    // Mid-flight: minute hand is partway to 270°.
    now.value = start + 100;
    await tick();
    expect(
      screen.getByTestId(clockMinuteId).element().getAttribute('transform'),
    ).not.toBe('rotate(0)');

    // Redirect to Asia/Tokyo (UTC+9, on the hour) — minute hand moves back.
    await screen.rerender({ zone: 'Asia/Tokyo' });
    await tick();

    now.value = start + 400;
    await tick();
    expect(
      screen.getByTestId(clockMinuteId).element().getAttribute('transform'),
    ).toBe('rotate(0)');
  });

  test('redirects the animation when the zone changes mid-animation', async () => {
    now.value = start;
    const screen = await render(ClockHands, { props: { zone: 'UTC' } });

    // Start animating toward Europe/Berlin (+1 hour).
    await screen.rerender({ zone: 'Europe/Berlin' });
    await tick();

    // Berlin is on the hour — the minute hand does not move.
    now.value = start + 100;
    await tick();
    expect(
      screen.getByTestId(clockMinuteId).element().getAttribute('transform'),
    ).toBe('rotate(0)');

    // Redirect to Asia/Kathmandu (UTC+5:45) — minute hand moves.
    await screen.rerender({ zone: 'Asia/Kathmandu' });
    await tick();

    now.value = start + 400;
    await tick();
    expect(
      screen.getByTestId(clockMinuteId).element().getAttribute('transform'),
    ).toBe('rotate(270)');
  });
});
