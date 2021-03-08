export const roundToNearestDecimal = (num: number, decimalPlaces: number) => {
  const decimalPlacesToUse = Math.max(1, Math.round(decimalPlaces));
  return Math.round(num * 10 ** decimalPlacesToUse) / 10 ** decimalPlacesToUse;
};

export const clamp = (num: number, min: number, max: number) =>
  Math.max(Math.min(num, max), min);
