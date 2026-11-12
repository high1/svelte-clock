import { untrack } from 'svelte';

/**
 * Animates hour/minute fractions toward their targets when `changeKey` changes.
 * Returns displayed fractions that track the target plus a decaying offset.
 */
export function createClockAnimation(
  changeKey: () => string,
  targets: { hour: () => number; minute: () => number },
  duration = 500,
) {
  let hourOffset = $state(0);
  let minuteOffset = $state(0);
  let frame = 0;

  $effect(() => {
    changeKey(); // tracked — re-runs when the key changes

    const targetHour = untrack(targets.hour);
    const targetMinute = untrack(targets.minute);
    const currentOffsetHour = untrack(() => hourOffset);
    const currentOffsetMinute = untrack(() => minuteOffset);

    const currentHour = (targetHour + currentOffsetHour + 1) % 1;
    const currentMinute = (targetMinute + currentOffsetMinute + 1) % 1;

    const hourDelta = shortestDelta(currentHour, targetHour);
    const minuteDelta = shortestDelta(currentMinute, targetMinute);

    if (hourDelta === 0 && minuteDelta === 0) return;

    hourOffset = -hourDelta;
    minuteOffset = -minuteDelta;

    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - t) ** 3; // easeOutCubic
      hourOffset = -hourDelta * (1 - eased);
      minuteOffset = -minuteDelta * (1 - eased);
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
    };
  });

  return {
    get hour() {
      return (targets.hour() + hourOffset + 1) % 1;
    },
    get minute() {
      return (targets.minute() + minuteOffset + 1) % 1;
    },
  };
}

/** Shortest signed delta between two fractions in [0, 1). */
export function shortestDelta(from: number, to: number): number {
  let delta = to - from;
  if (delta > 0.5) delta -= 1;
  if (delta < -0.5) delta += 1;
  return delta;
}
