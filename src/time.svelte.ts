import { rotate, seconds } from '@/common';
import { SvelteDate } from 'svelte/reactivity';

const hours = seconds / 5;
const getSecondsSinceMidnight = (): number =>
  (Date.now() - new SvelteDate().setHours(0, 0, 0, 0)) / 1000;

let clock = $state(getSecondsSinceMidnight());
const subsecond = $derived(rotate(clock % 1, 0));
const second = $derived(rotate((clock % seconds) / seconds));
const minute = $derived(rotate(((clock / seconds) % seconds) / seconds));
const hour = $derived(rotate(((clock / seconds / seconds) % hours) / hours));

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
