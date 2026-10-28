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

  describe('across daylight saving transitions', () => {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const transitions: Record<string, { autumn: number; spring: number }> = {
      'America/New_York': {
        autumn: Date.UTC(2020, 10, 1, 6),
        spring: Date.UTC(2020, 2, 8, 7),
      },
      'Australia/Sydney': {
        autumn: Date.UTC(2020, 3, 4, 16),
        spring: Date.UTC(2020, 9, 3, 16),
      },
      'Europe/Berlin': {
        autumn: Date.UTC(2020, 9, 25, 1),
        spring: Date.UTC(2020, 2, 29, 1),
      },
    };

    const transition = transitions[zone];

    test.skipIf(!transition)('spring forward skips an hour', () => {
      if (!transition) return;

      expect(getSecondsSinceMidnight(new Date(transition.spring - 1000))).toBe(
        7199,
      );
      expect(getSecondsSinceMidnight(new Date(transition.spring))).toBe(10800);
    });

    test.skipIf(!transition)('fall back repeats an hour', () => {
      if (!transition) return;

      const before = zone === 'America/New_York' ? 7199 : 10799;
      const after = zone === 'America/New_York' ? 3600 : 7200;

      expect(getSecondsSinceMidnight(new Date(transition.autumn - 1000))).toBe(
        before,
      );
      expect(getSecondsSinceMidnight(new Date(transition.autumn))).toBe(after);
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

  test('converts timestamps to Berlin wall-clock time', () => {
    const spring = Date.UTC(2020, 2, 8, 11, 0, 0, 0);
    const autumn = Date.UTC(2020, 10, 1, 11, 0, 0, 0);

    expect(getSecondsSinceMidnightIn(spring, 'Europe/Berlin')).toBe(12 * 3600);
    expect(getSecondsSinceMidnightIn(autumn, 'Europe/Berlin')).toBe(12 * 3600);
  });

  test('spring forward skips from 01:59:59 to 03:00:00', () => {
    const before = Date.UTC(2020, 2, 29, 0, 59, 59);
    const after = Date.UTC(2020, 2, 29, 1, 0, 0);

    expect(getSecondsSinceMidnightIn(before, 'Europe/Berlin')).toBe(7199);
    expect(getSecondsSinceMidnightIn(after, 'Europe/Berlin')).toBe(10800);
  });

  test('fall back repeats the 02:00 hour', () => {
    const before = Date.UTC(2020, 9, 25, 0, 59, 59);
    const after = Date.UTC(2020, 9, 25, 1, 0, 0);

    expect(getSecondsSinceMidnightIn(before, 'Europe/Berlin')).toBe(10799);
    expect(getSecondsSinceMidnightIn(after, 'Europe/Berlin')).toBe(7200);
  });
});

describe('startClock', () => {
  const cleanups = new Set<() => void>();

  const start = () => {
    const stop = startClock();
    cleanups.add(stop);
    return () => {
      cleanups.delete(stop);
      stop();
    };
  };

  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(globalThis, 'requestAnimationFrame');
  });

  afterEach(() => {
    cleanups.forEach((stop) => {
      stop();
    });
    cleanups.clear();
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  test('schedules one rAF loop for the first subscriber', () => {
    const stop = start();

    expect(vi.mocked(globalThis.requestAnimationFrame)).toHaveBeenCalledTimes(
      1,
    );

    const before = now.value;
    vi.advanceTimersToNextFrame();
    expect(now.value).not.toBe(before);

    stop();
  });

  test('reuses the same loop for additional subscribers', () => {
    const stopFirst = start();
    const stopSecond = start();
    const stopThird = start();

    expect(vi.mocked(globalThis.requestAnimationFrame)).toHaveBeenCalledTimes(
      1,
    );

    stopFirst();
    stopSecond();
    stopThird();
  });

  test('stops updating the instant after unmount', () => {
    const stop = start();

    vi.advanceTimersToNextFrame();
    const afterRun = now.value;
    expect(afterRun).toBeGreaterThan(0);

    stop();
    vi.advanceTimersToNextFrame();

    expect(now.value).toBe(afterRun);
  });

  test('keeps the loop running while any subscriber remains', () => {
    const stopFirst = start();
    const stopSecond = start();
    const stopThird = start();

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
    const stop = start();
    stop();

    start()();
    expect(vi.mocked(globalThis.requestAnimationFrame)).toHaveBeenCalledTimes(
      2,
    );
  });

  test('calling stop more than once does not prevent a later clock from starting', () => {
    const stop = start();
    stop();
    stop();

    const stopNext = start();

    expect(vi.mocked(globalThis.requestAnimationFrame)).toHaveBeenCalledTimes(
      2,
    );

    stopNext();
  });
});
