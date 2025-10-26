import { beforeAll, describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { time } from 'time.svelte';
import ClockHands from 'ClockHands.svelte';

describe('<ClockHands />', () => {
  beforeAll(() => {
    vi.hoisted(() => {
      vi.setSystemTime(new Date(2020, 0).setHours(0, 0, 0, 0));
    });
  });
  // beforeEach(() => {
  //   vi.setSystemTime(new Date().setHours(0, 0, 0, 0));
  // });
  // afterEach(() => {
  //   vi.unstubAllEnvs();
  // });
  test('renders starting hours correctly', () => {
    const screen = render(ClockHands);
    expect(
      screen.getByTestId('clock-hour').element().getAttribute('transform'),
    ).toBe('rotate(0.0)');
  });
  test('renders elapsed hours correctly', () => {
    const elapsedHours = Math.floor(Math.random() * 12);
    vi.setSystemTime(new Date(2020, 0).setHours(elapsedHours, 0, 0, 0));
    time.update();
    const screen = render(ClockHands);
    expect(
      screen.getByTestId('clock-hour').element().getAttribute('transform'),
    ).toBe(`rotate(${elapsedHours * 30}.0)`);
  });
  test('renders starting minutes correctly', () => {
    const screen = render(ClockHands);
    expect(
      screen.getByTestId('clock-minute').element().getAttribute('transform'),
    ).toBe('rotate(0.0)');
  });
  test('renders elapsed minutes correctly', () => {
    const elapsedMinutes = Math.floor(Math.random() * 59);
    vi.setSystemTime(new Date(2020, 0).setHours(0, elapsedMinutes, 0, 0));
    time.update();
    const screen = render(ClockHands);
    expect(
      screen.getByTestId('clock-minute').element().getAttribute('transform'),
    ).toBe(`rotate(${elapsedMinutes * 6}.0)`);
  });
  test('renders starting seconds correctly', () => {
    const screen = render(ClockHands);
    expect(
      screen.getByTestId('clock-second').element().getAttribute('transform'),
    ).toBe('rotate(0.0)');
  });
  test('renders elapsed seconds correctly', () => {
    const elapsedSeconds = Math.floor(Math.random() * 59);
    vi.setSystemTime(new Date(2020, 0).setHours(0, 0, elapsedSeconds, 0));
    time.update();
    const screen = render(ClockHands);
    expect(
      screen.getByTestId('clock-second').element().getAttribute('transform'),
    ).toBe(`rotate(${elapsedSeconds * 6}.0)`);
  });
});
