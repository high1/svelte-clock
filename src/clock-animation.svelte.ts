import { untrack } from 'svelte';

import { hourFraction, minuteFraction } from '#src/common';
import { type createTime, now, zonedParts } from '#src/time.svelte';

export const ANIMATION_DURATION = 500;

/**
 * Animates hour/minute fractions toward their targets when the zone changes.
 * Both hands rotate in the direction of the zone change: forward when the new
 * zone is ahead, backward otherwise. The animation is derived from the shared
 * rAF clock (`now.value`); there is no separate animation loop. Returns the
 * displayed fractions.
 */
export function createClockAnimation(
  time: ReturnType<typeof createTime>,
  duration = ANIMATION_DURATION,
) {
  let hourDelta = $state(0);
  let minuteDelta = $state(0);
  let animationStart = $state<number>();
  let previousZone: string | undefined;

  $effect(() => {
    const newZone = time.zone(); // tracked — re-runs when the zone changes

    if (previousZone === undefined || previousZone === newZone) {
      previousZone = newZone;
      return;
    }

    const nowValue = untrack(() => now.value);
    const oldParts = zonedParts(nowValue, previousZone);
    const newParts = zonedParts(nowValue, newZone);
    const forward = newParts.offset >= oldParts.offset;

    hourDelta = directionalDelta(
      hourFraction(oldParts.wallSeconds),
      hourFraction(newParts.wallSeconds),
      forward,
    );
    minuteDelta = directionalDelta(
      minuteFraction(oldParts.wallSeconds),
      minuteFraction(newParts.wallSeconds),
      forward,
    );
    animationStart = nowValue;
    previousZone = newZone;
  });

  // When no animation is running, don't read now.value at all.
  const progress = $derived(
    animationStart === undefined
      ? 1
      : Math.min((now.value - animationStart) / duration, 1),
  );
  const eased = $derived(progress < 1 ? 1 - (1 - progress) ** 3 : progress); // easeOutCubic

  // Pin animationStart to undefined once the animation completes so we
  // stop reading now.value and stop re-deriving per frame.
  $effect(() => {
    if (animationStart === undefined) return;
    if (progress === 1) animationStart = undefined;
  });

  return {
    get hour() {
      return eased === 1
        ? time.hour
        : (time.hour - hourDelta * (1 - eased) + 1) % 1;
    },
    get minute() {
      return eased === 1
        ? time.minute
        : (time.minute - minuteDelta * (1 - eased) + 1) % 1;
    },
    get second() {
      return time.second;
    },
    get subsecond() {
      return time.subsecond;
    },
  };
}

/** Decimal precision for animation deltas — float noise below this is zero. */
const DECIMAL_PRECISION = 4;

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
  const raw = Number((to - from).toFixed(DECIMAL_PRECISION));

  return raw
    ? forward
      ? raw < 0
        ? raw + 1
        : raw
      : raw >= 0
        ? raw - 1
        : raw
    : 0;
}
