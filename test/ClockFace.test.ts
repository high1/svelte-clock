import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';

import ClockFace from '#src/ClockFace.svelte';
import { clockFaceId } from '#src/common';

describe('<ClockFace />', () => {
  test('renders clock face', async () => {
    const screen = await render(ClockFace);
    expect(screen.getByTestId(clockFaceId)).toBeInTheDocument();
  });
  test('unmounts clock face', async () => {
    const screen = await render(ClockFace);
    await screen.unmount();
    expect(screen.getByTestId(clockFaceId)).not.toBeInTheDocument();
  });
});
