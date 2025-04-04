import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import ClockFace from 'ClockFace.svelte';

describe('<ClockFace />', () => {
  test('renders clock face', () => {
    render(ClockFace);
    expect(screen.getByTestId('clock-face')).toBeInTheDocument();
  });
});
