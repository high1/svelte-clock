import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Graduations from 'Graduations.svelte';

describe('<Graduations />', () => {
  test('renders all graduations', () => {
    render(Graduations);
    expect(
      screen.getAllByTestId(/^clock-graduation-(?:\d|[1-5]\d)$/),
    ).toHaveLength(60);
  });
});
