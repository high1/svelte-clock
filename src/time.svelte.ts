import { rotate, seconds } from '@/common';

const hours = seconds / 5;
const getSecondsSinceMidnight = () =>
  (Date.now() - new Date().setHours(0, 0, 0, 0)) / 1000;

let clock = $state(getSecondsSinceMidnight());
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
  update: () => (clock = getSecondsSinceMidnight()),
};
