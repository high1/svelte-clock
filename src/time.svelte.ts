import {
  hourFraction,
  minuteFraction,
  rotate,
  secondFraction,
  subsecondFraction,
} from '#src/common';
import { filterTimeZones } from '#src/timezone-options';

export const getSecondsSinceMidnight = (date: Date = new Date()) =>
  date.getHours() * 3600 +
  date.getMinutes() * 60 +
  date.getSeconds() +
  date.getMilliseconds() / 1000;

// The shared instant. Every clock reads from this single value, so one loop
// drives them all instead of one loop per clock.
export const now = $state({ value: Date.now() });

const subscribers = new Map<symbol, () => void>();
// Single shared rAF loop; runs while any subscriber remains.
let frame = 0;

// Each call adds a subscriber; idempotent per owner (same owner → same cleanup).
// Pair each startClock() with one cleanup call.
export const startClock = (owner: symbol) => {
  const existing = subscribers.get(owner);
  if (existing) {
    return existing;
  }

  const cleanup = () => {
    if (!subscribers.has(owner)) return;
    subscribers.delete(owner);
    if (subscribers.size === 0) {
      cancelAnimationFrame(frame);
    }
  };

  if (subscribers.size === 0) {
    const loop = () => {
      now.value = Date.now();
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
  }

  subscribers.set(owner, cleanup);

  return cleanup;
};

export const getTimeZone = () =>
  Intl.DateTimeFormat().resolvedOptions().timeZone;

export function getTimeZones(): string[] {
  return filterTimeZones(Intl.supportedValuesOf('timeZone'));
}

const formatters = new Map<string, Intl.DateTimeFormat>();

const formatterFor = (zone: string) => {
  const existing = formatters.get(zone);
  if (existing) return existing;

  const formatter = new Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    hourCycle: 'h23',
    minute: '2-digit',
    numberingSystem: 'latn',
    second: '2-digit',
    timeZone: zone,
  });
  formatters.set(zone, formatter);
  return formatter;
};

const partsIn = (timestamp: number, zone: string) =>
  new Map(
    formatterFor(zone)
      .formatToParts(new Date(timestamp))
      .map((part) => [part.type, part.value] as const),
  );

// Wall-clock seconds since local midnight in `zone`.
export const getSecondsSinceMidnightIn = (timestamp: number, zone: string) => {
  const parts = partsIn(timestamp, zone);

  return (
    Number(parts.get('hour')) * 3600 +
    Number(parts.get('minute')) * 60 +
    Number(parts.get('second')) +
    // Normalize ms to [0, 1000) so negative timestamps work.
    (((timestamp % 1000) + 1000) % 1000) / 1000
  );
};

// One clock in `zone`: the shared instant as hand rotations.
export const createTime = (zone: () => string) => {
  const clock = $derived(getSecondsSinceMidnightIn(now.value, zone()));
  const hour = $derived(rotate(hourFraction(clock), 1));
  const minute = $derived(rotate(minuteFraction(clock), 1));
  const second = $derived(rotate(secondFraction(clock), 1));
  const subsecond = $derived(rotate(subsecondFraction(clock), 0));

  return {
    get hour() {
      return hour;
    },
    get minute() {
      return minute;
    },
    get second() {
      return second;
    },
    get subsecond() {
      return subsecond;
    },
  };
};
