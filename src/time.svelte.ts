import { rotate, seconds } from '#src/common';

const hours = seconds / 5;

export const getSecondsSinceMidnight = (date: Date = new Date()) =>
  date.getHours() * 3600 +
  date.getMinutes() * 60 +
  date.getSeconds() +
  date.getMilliseconds() / 1000;

// The shared instant. Every clock reads from this single value, so one loop
// drives them all instead of one loop per clock.
export const now = $state({ value: Date.now() });

let subscribers = 0;
let frame = 0;

export const startClock = () => {
  if (++subscribers === 1) {
    const loop = () => {
      now.value = Date.now();
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
  }

  return () => {
    if (--subscribers === 0) {
      cancelAnimationFrame(frame);
    }
  };
};

const clock = $derived(getSecondsSinceMidnight(new Date(now.value)));
const subsecond = $derived(rotate(clock % 1, 0));
const second = $derived(rotate((clock % seconds) / seconds));
const minute = $derived(rotate(((clock / seconds) % seconds) / seconds));
const hour = $derived(rotate(((clock / seconds / seconds) % hours) / hours));

export const time = {
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
