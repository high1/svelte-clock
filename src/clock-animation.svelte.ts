import { untrack } from 'svelte';

import { hourFraction, minuteFraction } from '#src/common';
import { getSecondsSinceMidnightIn, now } from '#src/time.svelte';

/**
 * Animates hour/minute fractions toward their targets when `changeKey` changes.
 * Both hands rotate in the direction of the zone change: forward when the new
 * zone is ahead, backward otherwise. Returns displayed fractions that track
 * the live target plus a decaying offset.
 */
export function createClockAnimation(
  changeKey: () => string,
  targets: { hour: () => number; minute: () => number },
  duration = 250,
) {
  let hourOffset = $state(0);
  let minuteOffset = $state(0);
  let frame = 0;
  let previousZone: string | undefined;

  $effect(() => {
    const newZone = changeKey(); // tracked — re-runs when the key changes

    const oldZone = previousZone;
    previousZone = newZone;

    if (oldZone === undefined || oldZone === newZone) return;

    const nowValue = untrack(() => now.value);
    const oldSec = getSecondsSinceMidnightIn(nowValue, oldZone);
    const newSec = getSecondsSinceMidnightIn(nowValue, newZone);
    const diff = (((newSec - oldSec) % 86400) + 86400) % 86400;
    const forward = diff <= 43200;

    const hourDelta = directionalDelta(
      hourFraction(oldSec),
      hourFraction(newSec),
      forward,
    );
    const minuteDelta = directionalDelta(
      minuteFraction(oldSec),
      minuteFraction(newSec),
      forward,
    );

    if (hourDelta === 0 && minuteDelta === 0) return;

    hourOffset = -hourDelta;
    minuteOffset = -minuteDelta;

    const start = performance.now();

    const tick = (time: number) => {
      const t = Math.min((time - start) / duration, 1);
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

/**
 * Signed angular delta in a chosen direction (full turn = 1).
 * Forward may exceed half a turn (e.g. +8h → +0.66 turn of the hour hand);
 * backward is the equivalent negative.
 */
export function directionalDelta(
  from: number,
  to: number,
  forward: boolean,
): number {
  const raw = to - from;

  if (raw === 0) return 0;

  return forward ? (raw < 0 ? raw + 1 : raw) : raw >= 0 ? raw - 1 : raw;
}
