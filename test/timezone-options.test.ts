import { describe, expect, test } from 'vitest';

import {
  getTimezoneGroups,
  normalize,
  zoneLabel,
  zoneRegion,
} from '#src/timezone-options';

describe('normalize', () => {
  test('lowercases and replaces underscores with spaces', () => {
    expect(normalize('America/New_York')).toBe('america/new york');
  });
});

describe('zoneRegion', () => {
  test('returns the text before the first slash', () => {
    expect(zoneRegion('Europe/Berlin')).toBe('Europe');
  });

  test('returns Other for zones without a slash', () => {
    expect(zoneRegion('UTC')).toBe('Other');
  });
});

describe('zoneLabel', () => {
  test('returns the last segment with underscores as spaces', () => {
    expect(zoneLabel('America/New_York')).toBe('New York');
  });

  test('returns the whole zone when there is no slash', () => {
    expect(zoneLabel('UTC')).toBe('UTC');
  });
});

describe('getTimezoneGroups', () => {
  const zones = ['Africa/Abidjan', 'America/New_York', 'Europe/Berlin', 'UTC'];

  test('returns every zone when the query is empty', () => {
    const groups = getTimezoneGroups(zones, '');
    const flat = groups.flatMap((group) =>
      group.items.map((item) => item.zone),
    );
    expect(flat).toEqual(zones);
  });

  test('filters case-insensitively and matches underscores as spaces', () => {
    const groups = getTimezoneGroups(zones, 'new york');
    const flat = groups.flatMap((group) =>
      group.items.map((item) => item.zone),
    );
    expect(flat).toEqual(['America/New_York']);
  });

  test('groups by region and assigns contiguous indices', () => {
    const groups = getTimezoneGroups(zones, '');
    expect(groups.map((group) => group.region)).toEqual([
      'Africa',
      'America',
      'Europe',
      'Other',
    ]);
    expect(groups.flatMap((g) => g.items.map((i) => i.index))).toEqual([
      0, 1, 2, 3,
    ]);
  });

  test('returns no groups when nothing matches', () => {
    expect(getTimezoneGroups(zones, 'zzzzz')).toEqual([]);
  });

  test('does not mutate the input', () => {
    const input = [...zones];
    getTimezoneGroups(input, 'europe');
    expect(input).toEqual(zones);
  });
});
