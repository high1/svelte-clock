import { handRotations } from '#src/common';

export const getSecondsSinceMidnight = (date: Date = new Date()) =>
  date.getHours() * 3600 +
  date.getMinutes() * 60 +
  date.getSeconds() +
  date.getMilliseconds() / 1000;

// The shared instant. Every clock reads from this single value, so one loop
// drives them all instead of one loop per clock.
export const now = $state({ value: Date.now() });

const subscribers = new Set<symbol>();
let frame = 0;

export const startClock = () => {
  const subscriber = Symbol();
  subscribers.add(subscriber);

  if (subscribers.size === 1) {
    const loop = () => {
      now.value = Date.now();
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
  }

  return () => {
    if (!subscribers.delete(subscriber)) return;

    if (subscribers.size === 0) {
      cancelAnimationFrame(frame);
    }
  };
};

export const getTimeZone = () =>
  Intl.DateTimeFormat().resolvedOptions().timeZone;

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
    (((timestamp % 1000) + 1000) % 1000) / 1000
  );
};

// One clock in `zone`: the shared instant as hand rotations.
export const createTime = (zone: () => string) => {
  const clock = $derived(getSecondsSinceMidnightIn(now.value, zone()));
  const rotations = $derived.by(() => handRotations(clock));

  return {
    get hour() {
      return rotations.hour;
    },
    get minute() {
      return rotations.minute;
    },
    get second() {
      return rotations.second;
    },
    get subsecond() {
      return rotations.subsecond;
    },
  };
};
