import { afterAll, describe, expect, test, vi } from 'vitest';

import { getTestId } from '#src/utilities';

afterAll(() => void vi.unstubAllEnvs());

describe('getTestId', () => {
  test('returns undefined outside test builds', () => {
    vi.stubEnv('MODE', 'development');
    expect(getTestId('test')).toBeUndefined();
  });

  test('returns the id in test builds', () => {
    vi.stubEnv('MODE', 'test');
    expect(getTestId('test')).toBe('test');
  });
});
