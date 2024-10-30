import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import ClockFace from 'ClockFace.svelte';

describe('<ClockFace />', () => {
  test('renders clock facer', () => {
    render(ClockFace);
    expect(screen.getByTestId('clock-face')).toBeInTheDocument();
  });
  test('renders all graduations', () => {
    render(ClockFace);
    expect(
      screen.getAllByTestId(/^clock-graduation-(?:\d|[1-5]\d)$/),
    ).toHaveLength(60);
  });
});
