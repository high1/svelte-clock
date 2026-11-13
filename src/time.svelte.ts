import {
  hourFraction,
  minuteFraction,
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
    day: '2-digit',
    hour: '2-digit',
    hourCycle: 'h23',
    minute: '2-digit',
    month: '2-digit',
    numberingSystem: 'latn',
    second: '2-digit',
    timeZone: zone,
    year: 'numeric',
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

/** Wall-clock parts of `zone` at `timestamp`: local seconds and UTC offset. */
export const zonedParts = (timestamp: number, zone: string) => {
  const parts = partsIn(timestamp, zone);

  const wallSeconds =
    Number(parts.get('hour')) * 3600 +
    Number(parts.get('minute')) * 60 +
    Number(parts.get('second')) +
    (((timestamp % 1000) + 1000) % 1000) / 1000;

  const asUTC = Date.UTC(
    Number(parts.get('year')),
    Number(parts.get('month')) - 1,
    Number(parts.get('day')),
    Number(parts.get('hour')),
    Number(parts.get('minute')),
    Number(parts.get('second')),
  );

  return {
    offset: Math.floor((asUTC - timestamp) / 1000),
    wallSeconds,
  };
};

/** UTC offset of `zone` at `timestamp`, in seconds. */
export const getTimezoneOffset = (timestamp: number, zone: string) =>
  zonedParts(timestamp, zone).offset;

// Wall-clock seconds since local midnight in `zone`.
export const getSecondsSinceMidnightIn = (timestamp: number, zone: string) =>
  zonedParts(timestamp, zone).wallSeconds;

// One clock in `zone`: the shared instant as hand rotations.
export const createTime = (zone: () => string) => {
  const clock = $derived(getSecondsSinceMidnightIn(now.value, zone()));
  const hour = $derived(hourFraction(clock));
  const minute = $derived(minuteFraction(clock));
  const second = $derived(secondFraction(clock));
  const subsecond = $derived(subsecondFraction(clock));

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
