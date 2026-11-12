import { describe, expect, test } from 'vitest';

import { shortestDelta } from '#src/clock-animation.svelte';

describe('shortestDelta', () => {
  test.each([
    ['same value', 0.5, 0.5, 0],
    ['forward small', 0.1, 0.3, 0.2],
    ['backward small', 0.3, 0.1, -0.2],
    ['forward across zero', 0.9, 0.1, 0.2],
    ['backward across zero', 0.1, 0.9, -0.2],
    ['exactly half turn forward', 0.0, 0.5, 0.5],
    ['exactly half turn backward', 0.5, 0.0, -0.5],
    ['large forward jump takes shortest path', 0.1, 0.9, -0.2],
    ['large backward jump takes shortest path', 0.9, 0.1, 0.2],
  ])('%s', (_name, from, to, expected) => {
    expect(shortestDelta(from, to)).toBeCloseTo(expected, 5);
  });
});
