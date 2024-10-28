import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import ClockFace from 'ClockFace.svelte';

describe('<ClockFace />', () => {
  test('renders', () => {
    render(ClockFace);
    expect(screen.getByTestId('clock-face')).toBeInTheDocument();
    expect(screen.getAllByTestId('clock-graduation')).toHaveLength(60);
  });
});
