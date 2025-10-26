import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import Graduations from 'Graduations.svelte';

describe('<Graduations />', () => {
  test('renders all graduations', () => {
    render(Graduations);
    expect(page.getByTestId(/^clock-graduation-(?:\d|[1-5]\d)$/)).toHaveLength(
      60,
    );
  });
});
