export const seconds = 60;
export const rotate = (rotate: number, fractionDigits = 1) =>
  `rotate(${(rotate * 360).toFixed(fractionDigits)})`;

// Turns seconds since midnight into one full revolution per hand.
export const handRotations = (clock: number) => {
  const hours = seconds / 5;

  return {
    hour: rotate(((clock / seconds ** 2) % hours) / hours),
    minute: rotate(((clock / seconds) % seconds) / seconds),
    second: rotate((clock % seconds) / seconds),
    subsecond: rotate(clock % 1, 0),
  };
};
export const clockFaceId = 'clock-face';
export const clockGraduationId = 'clock-graduation';
export const clockHourId = 'clock-hour';
export const clockMinuteId = 'clock-minute';
export const clockSecondId = 'clock-second';
