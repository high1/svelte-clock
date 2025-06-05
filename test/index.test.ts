import { describe, expect, test, vi } from 'vitest';
import { mount } from 'svelte';
import ClockFace from 'ClockFace.svelte';

describe('index', () => {
  test('render is being called', async () => {
    vi.mock('svelte', { spy: true });
    await import('index');
    expect(mount).toHaveBeenCalledWith(ClockFace, {
      target: document.body,
    });
  });
});
