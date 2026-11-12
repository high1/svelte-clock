import { untrack } from 'svelte';

import { hourFraction, minuteFraction } from '#src/common';
import { getSecondsSinceMidnightIn, now } from '#src/time.svelte';

/**
 * Animates hour/minute fractions toward their targets when `changeKey` changes.
 * Both hands rotate in the direction of the zone change: forward when the new
 * zone is ahead, backward otherwise. The animation is derived from the shared
 * rAF clock (`now.value`); there is no separate animation loop. Returns the
 * displayed fractions.
 */
export function createClockAnimation(
  changeKey: () => string,
  targets: { hour: () => number; minute: () => number },
  duration = 250,
) {
  let hourDelta = $state(0);
  let minuteDelta = $state(0);
  let animationStart = $state<number | undefined>(undefined);
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

    hourDelta = directionalDelta(
      hourFraction(oldSec),
      hourFraction(newSec),
      forward,
    );
    minuteDelta = directionalDelta(
      minuteFraction(oldSec),
      minuteFraction(newSec),
      forward,
    );
    animationStart = nowValue;
  });

  const progress = $derived(
    animationStart === undefined
      ? 1
      : Math.min((now.value - animationStart) / duration, 1),
  );
  const eased = $derived(1 - (1 - progress) ** 3); // easeOutCubic

  return {
    get hour() {
      return (targets.hour() - hourDelta * (1 - eased) + 1) % 1;
    },
    get minute() {
      return (targets.minute() - minuteDelta * (1 - eased) + 1) % 1;
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
