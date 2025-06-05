import { beforeAll, describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import { time } from 'time.svelte';
import ClockHands from 'ClockHands.svelte';
import { beforeEach } from 'node:test';

describe('<ClockHands />', () => {
  beforeAll(() => {
    vi.hoisted(() => {
      vi.setSystemTime(new Date().setHours(0, 0, 0, 0));
    });
  });
  beforeEach(() => {
    vi.setSystemTime(new Date().setHours(0, 0, 0, 0));
  });
  test('renders starting hours correctly', () => {
    render(ClockHands);
    expect(screen.getByTestId('clock-hour').getAttribute('transform')).toBe(
      'rotate(0.0)',
    );
  });
  test('renders elapsed hours correctly', () => {
    const elapsedHours = Math.floor(Math.random() * 12);
    vi.setSystemTime(new Date().setHours(elapsedHours, 0, 0, 0));
    time.update();
    render(ClockHands);
    expect(screen.getByTestId('clock-hour').getAttribute('transform')).toBe(
      `rotate(${elapsedHours * 30}.0)`,
    );
  });
  test('renders starting minutes correctly', () => {
    render(ClockHands);
    expect(screen.getByTestId('clock-minute').getAttribute('transform')).toBe(
      'rotate(0.0)',
    );
  });
  test('renders elapsed minutes correctly', () => {
    const elapsedMinutes = Math.floor(Math.random() * 59);
    vi.setSystemTime(new Date().setHours(0, elapsedMinutes, 0, 0));
    time.update();
    render(ClockHands);
    expect(screen.getByTestId('clock-minute').getAttribute('transform')).toBe(
      `rotate(${elapsedMinutes * 6}.0)`,
    );
  });
  test('renders starting seconds correctly', () => {
    render(ClockHands);
    expect(screen.getByTestId('clock-second').getAttribute('transform')).toBe(
      'rotate(0.0)',
    );
  });
  test('renders elapsed seconds correctly', () => {
    const elapsedSeconds = Math.floor(Math.random() * 59);
    vi.setSystemTime(new Date().setHours(0, 0, elapsedSeconds, 0));
    time.update();
    render(ClockHands);
    expect(screen.getByTestId('clock-second').getAttribute('transform')).toBe(
      `rotate(${elapsedSeconds * 6}.0)`,
    );
  });
});
