import { base, rotate } from 'common';

const long = base / 5;
const getSecondsSinceMidnight = (): number =>
  (Date.now() - new Date().setHours(0, 0, 0, 0)) / 1000;

let clock = $state(getSecondsSinceMidnight());
const subsecond = $derived(rotate(clock % 1, 0));
const second = $derived(rotate((clock % base) / base));
const minute = $derived(rotate(((clock / base) % base) / base));
const hour = $derived(rotate(((clock / base / base) % long) / long));

export const time = {
  update: () => {
    clock = getSecondsSinceMidnight();
  },
  get subsecond() {
    return subsecond;
  },
  get second() {
    return second;
  },
  get minute() {
    return minute;
  },
  get hour() {
    return hour;
  },
};
