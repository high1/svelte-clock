import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';

import ClockFace from '@/ClockFace.svelte';
import { clockFaceId } from '@/common';

describe('<ClockFace />', () => {
  test('renders clock face', () => {
    const screen = render(ClockFace);
    expect(screen.getByTestId(clockFaceId)).toBeInTheDocument();
  });
  test('unmounts clock face', () => {
    const screen = render(ClockFace);
    screen.unmount();
    expect(screen.getByTestId(clockFaceId)).not.toBeInTheDocument();
  });
});
