import { describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';

import ClockHands from '#src/ClockHands.svelte';
import { clockHourId, clockMinutedId, clockSecondId } from '#src/common';
import { time } from '#src/time.svelte';

vi.hoisted(() => {
  vi.setSystemTime(new Date(2020, 0));
});

describe('<ClockHands />', () => {
  test('renders starting hours correctly', async () => {
    vi.setSystemTime(new Date(2020, 0).setHours(0));
    time.update();
    const screen = await render(ClockHands);
    expect(
      screen.getByTestId(clockHourId).element().getAttribute('transform'),
    ).toBe('rotate(0.0)');
  });
  test('renders elapsed hours correctly', async () => {
    const elapsedHours = Math.floor(Math.random() * 12);
    vi.setSystemTime(new Date(2020, 0).setHours(elapsedHours));
    time.update();
    const screen = await render(ClockHands);
    expect(
      screen.getByTestId(clockHourId).element().getAttribute('transform'),
    ).toBe(`rotate(${elapsedHours * 30}.0)`);
  });
  test('renders starting minutes correctly', async () => {
    const screen = await render(ClockHands);
    expect(
      screen.getByTestId(clockMinutedId).element().getAttribute('transform'),
    ).toBe('rotate(0.0)');
  });
  test('renders elapsed minutes correctly', async () => {
    const elapsedMinutes = Math.floor(Math.random() * 59);
    vi.setSystemTime(new Date(2020, 0).setMinutes(elapsedMinutes));
    time.update();
    const screen = await render(ClockHands);
    expect(
      screen.getByTestId(clockMinutedId).element().getAttribute('transform'),
    ).toBe(`rotate(${elapsedMinutes * 6}.0)`);
  });
  test('renders starting seconds correctly', async () => {
    const screen = await render(ClockHands);
    expect(
      screen.getByTestId(clockSecondId).element().getAttribute('transform'),
    ).toBe('rotate(0.0)');
  });
  test('renders elapsed seconds correctly', async () => {
    const elapsedSeconds = Math.floor(Math.random() * 59);
    vi.setSystemTime(new Date(2020, 0).setSeconds(elapsedSeconds));
    time.update();
    const screen = await render(ClockHands);
    expect(
      screen.getByTestId(clockSecondId).element().getAttribute('transform'),
    ).toBe(`rotate(${elapsedSeconds * 6}.0)`);
  });
});
