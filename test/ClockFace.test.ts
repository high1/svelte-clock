import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';

import ClockFace from '@/ClockFace.svelte';

describe('<ClockFace />', () => {
  test('renders clock face', () => {
    const screen = render(ClockFace);
    expect(screen.getByTestId('clock-face')).toBeInTheDocument();
  });
});
