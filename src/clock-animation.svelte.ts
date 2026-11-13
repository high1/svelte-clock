import { untrack } from 'svelte';

import { hourFraction, minuteFraction } from '#src/common';
import { now, zonedParts } from '#src/time.svelte';

export const ANIMATION_DURATION = 500;

/**
 * Animates hour/minute fractions toward their targets when the zone changes.
 * Both hands rotate in the direction of the zone change: forward when the new
 * zone is ahead, backward otherwise. The animation is derived from the shared
 * rAF clock (`now.value`); there is no separate animation loop. Returns the
 * displayed fractions.
 */
export function createClockAnimation(
  zone: () => string,
  target: { hour: () => number; minute: () => number },
  duration = ANIMATION_DURATION,
) {
  let hourDelta = $state(0);
  let minuteDelta = $state(0);
  let animationStart = $state<number | undefined>(undefined);
  let previousZone: string | undefined;

  $effect(() => {
    const newZone = zone(); // tracked — re-runs when the zone changes

    const oldZone = previousZone;
    previousZone = newZone;

    if (oldZone === undefined || oldZone === newZone) return;

    const nowValue = untrack(() => now.value);
    const oldParts = zonedParts(nowValue, oldZone);
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
  });

  const progress = $derived(
    Math.min((now.value - (animationStart ?? 0)) / duration, 1),
  );
  const eased = $derived(progress >= 1 ? 1 : 1 - (1 - progress) ** 3); // easeOutCubic

  return {
    get hour() {
      return (target.hour() - hourDelta * (1 - eased) + 1) % 1;
    },
    get minute() {
      return (target.minute() - minuteDelta * (1 - eased) + 1) % 1;
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
