import { rotate, seconds } from '#src/common';

const hours = seconds / 5;
const getSecondsSinceMidnight = (date: Date) =>
  (date.getTime() - date.setHours(0, 0, 0, 0)) / 1000;

let clock = $state(getSecondsSinceMidnight(new Date()));
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
  update: () => (clock = getSecondsSinceMidnight(new Date())),
};
