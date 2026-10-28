import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { handRotations } from '#src/common';
import {
  getSecondsSinceMidnight,
  getSecondsSinceMidnightIn,
  now,
  startClock,
} from '#src/time.svelte';

describe('getSecondsSinceMidnight', () => {
  test.each([
    ['midnight', new Date(2020, 0, 1, 0, 0, 0, 0), 0],
    ['one second past midnight', new Date(2020, 0, 1, 0, 0, 1, 0), 1],
    ['one minute past midnight', new Date(2020, 0, 1, 0, 1, 0, 0), 60],
    ['noon', new Date(2020, 0, 1, 12, 0, 0, 0), 43_200],
    ['last second of the day', new Date(2020, 0, 1, 23, 59, 59, 0), 86_399],
    ['sub-second precision', new Date(2020, 0, 1, 1, 2, 3, 500), 3723.5],
  ])('%s', (_name, date, expected) => {
    expect(getSecondsSinceMidnight(date)).toBe(expected);
  });

  test('does not mutate the supplied date', () => {
    const date = new Date(2020, 0, 1, 12, 0, 0, 0);
    const before = date.getTime();

    getSecondsSinceMidnight(date);

    expect(date.getTime()).toBe(before);
  });

  // These dates are local wall-clock times, so they only land on a DST
  // boundary because the browser runs in a DST-observing timezone. Measuring
  // elapsed real time instead of wall-clock time puts these an hour out.
  describe('across daylight saving transitions', () => {
    test.each([
      ['spring forward (23-hour day)', new Date(2020, 2, 8, 12, 0, 0, 0)],
      ['fall back (25-hour day)', new Date(2020, 10, 1, 12, 0, 0, 0)],
    ])('%s', (_name, date) => {
      expect(getSecondsSinceMidnight(date)).toBe(12 * 3600);
    });
  });
});

describe('handRotations', () => {
  test.each([
    ['midnight', 0, 'rotate(0)', 'rotate(0)', 'rotate(0)', 'rotate(0)'],
    ['one hour', 3_600, 'rotate(0)', 'rotate(0)', 'rotate(0)', 'rotate(30)'],
    [
      'half past noon',
      43_200 + 1_800,
      'rotate(0)',
      'rotate(0)',
      'rotate(180)',
      'rotate(15)',
    ],
    [
      '59.5 seconds',
      59.5,
      'rotate(180)',
      'rotate(357)',
      'rotate(5.9)',
      'rotate(0.5)',
    ],
    [
      'next midnight',
      86_400,
      'rotate(0)',
      'rotate(0)',
      'rotate(0)',
      'rotate(0)',
    ],
  ])('%s', (_name, clock, subsecond, second, minute, hour) => {
    expect(handRotations(clock)).toEqual({ hour, minute, second, subsecond });
  });
});

describe('getSecondsSinceMidnightIn', () => {
  test.each([
    ['midnight', Date.UTC(2020, 0, 1, 0, 0, 0, 0), 0],
    ['one second past midnight', Date.UTC(2020, 0, 1, 0, 0, 1, 0), 1],
    ['one minute past midnight', Date.UTC(2020, 0, 1, 0, 1, 0, 0), 60],
    ['noon', Date.UTC(2020, 0, 1, 12, 0, 0, 0), 43_200],
    ['last second of the day', Date.UTC(2020, 0, 1, 23, 59, 59, 0), 86_399],
  ])('%s in UTC', (_name, timestamp, expected) => {
    expect(getSecondsSinceMidnightIn(timestamp, 'UTC')).toBe(expected);
  });

  test('renders the same instant in different zones', () => {
    const timestamp = Date.UTC(2020, 2, 8, 16, 30, 0, 0);

    expect(getSecondsSinceMidnightIn(timestamp, 'UTC')).toBe(16 * 3600 + 1800);
    expect(getSecondsSinceMidnightIn(timestamp, 'Europe/Berlin')).toBe(
      17 * 3600 + 1800,
    );
    expect(getSecondsSinceMidnightIn(timestamp, 'America/New_York')).toBe(
      12 * 3600 + 1800,
    );
    expect(getSecondsSinceMidnightIn(timestamp, 'Australia/Sydney')).toBe(
      3 * 3600 + 1800,
    );
  });

  test('noon stays at 12:00 wall-clock on DST transition days', () => {
    const spring = Date.UTC(2020, 2, 8, 11, 0, 0, 0);
    const autumn = Date.UTC(2020, 10, 1, 11, 0, 0, 0);

    expect(getSecondsSinceMidnightIn(spring, 'Europe/Berlin')).toBe(12 * 3600);
    expect(getSecondsSinceMidnightIn(autumn, 'Europe/Berlin')).toBe(12 * 3600);
  });
});

describe('startClock', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(globalThis, 'requestAnimationFrame');
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  test('schedules one rAF loop for the first subscriber', () => {
    const stop = startClock();

    expect(vi.mocked(globalThis.requestAnimationFrame)).toHaveBeenCalledTimes(
      1,
    );

    const before = now.value;
    vi.advanceTimersToNextFrame();
    expect(now.value).not.toBe(before);

    stop();
  });

  test('reuses the same loop for additional subscribers', () => {
    const stopFirst = startClock();
    const stopSecond = startClock();
    const stopThird = startClock();

    expect(vi.mocked(globalThis.requestAnimationFrame)).toHaveBeenCalledTimes(
      1,
    );

    stopFirst();
    stopSecond();
    stopThird();
  });

  test('stops updating the instant after unmount', () => {
    const stop = startClock();

    vi.advanceTimersToNextFrame();
    const afterRun = now.value;
    expect(afterRun).toBeGreaterThan(0);

    stop();
    vi.advanceTimersToNextFrame();

    expect(now.value).toBe(afterRun);
  });

  test('keeps the loop running while any subscriber remains', () => {
    const stopFirst = startClock();
    const stopSecond = startClock();
    const stopThird = startClock();

    vi.advanceTimersToNextFrame();
    const before = now.value;
    expect(before).toBeGreaterThan(0);

    stopFirst();
    stopSecond();

    vi.advanceTimersToNextFrame();
    expect(now.value).not.toBe(before);

    stopThird();
  });

  test('restarts the loop when a new subscriber mounts after unmount', () => {
    const stop = startClock();
    stop();

    startClock()();
    expect(vi.mocked(globalThis.requestAnimationFrame)).toHaveBeenCalledTimes(
      2,
    );
  });

  test('calling stop more than once does not throw', () => {
    const stop = startClock();
    stop();
    expect(() => {
      stop();
    }).not.toThrow();
  });
});
