import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';

import { clockGraduationId } from '#src/common';
import Graduations from '#src/Graduations.svelte';

describe('<Graduations />', () => {
  test('renders all graduations', () => {
    render(Graduations);
    expect(
      page.getByTestId(
        new RegExp(String.raw`^${clockGraduationId}-(?:\d|[1-5]\d)$`),
      ),
    ).toHaveLength(60);
  });
});
