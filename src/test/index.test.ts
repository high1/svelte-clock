import { describe, expect, test } from 'vitest';

describe('index', () => {
  test('crashes without root element', async () => {
    await expect(async () => await import('index')).rejects.toEqual(
      new Error('#root element not found'),
    );
  });
});
