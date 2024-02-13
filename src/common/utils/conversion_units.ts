export function fromMwhTokWh(value?: number) {
  if (value === 0) return 0;

  if (!value) return undefined;

  return value * 1000;
}

export function fromKwhToMwh(value?: number) {
  if (value === 0) return 0;

  if (!value) return undefined;

  return value / 1000;
}

export function fromEuroMwhToEuroKwh(value: number) {
  if (value === 0) return 0;

  return value / 1000;
}

export function fromEuroKwhToEuroMwh(value: number) {
  return value * 1000;
}
