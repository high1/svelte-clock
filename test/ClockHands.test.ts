import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';

import ClockHands from '#src/ClockHands.svelte';
import { clockHourId, clockMinuteId, clockSecondId } from '#src/common';
import { now } from '#src/time.svelte';

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
  [0, 'rotate(0.0)'],
  [1, 'rotate(6.0)'],
  [15, 'rotate(90.0)'],
  [30, 'rotate(180.0)'],
  [59, 'rotate(354.0)'],
] as const;

describe('<ClockHands /> in a fixed zone', () => {
  test.each([
    [0, 'rotate(0.0)'],
    [3, 'rotate(90.0)'],
    [6, 'rotate(180.0)'],
    [11, 'rotate(330.0)'],
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
    ).toBe('rotate(90.0)');
  });
});

describe('<ClockHands />', () => {
  test.each([
    [0, 'rotate(0.0)'],
    [1, 'rotate(30.0)'],
    [3, 'rotate(90.0)'],
    [6, 'rotate(180.0)'],
    [11, 'rotate(330.0)'],
    [12, 'rotate(0.0)'],
  ])('renders hour %i as %s', async (hours, transform) => {
    setTime(hours);
    const screen = await render(ClockHands);
    expect(
      screen.getByTestId(clockHourId).element().getAttribute('transform'),
    ).toBe(transform);
  });

  test.each(minuteSecondCases)(
    'renders minute %i as %s',
    async (minutes, transform) => {
      setTime(0, minutes);
      const screen = await render(ClockHands);
      expect(
        screen.getByTestId(clockMinuteId).element().getAttribute('transform'),
      ).toBe(transform);
    },
  );

  test.each(minuteSecondCases)(
    'renders second %i as %s',
    async (seconds, transform) => {
      setTime(0, 0, seconds);
      const screen = await render(ClockHands);
      expect(
        screen.getByTestId(clockSecondId).element().getAttribute('transform'),
      ).toBe(transform);
    },
  );
});
