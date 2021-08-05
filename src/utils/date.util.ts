export const toDate = (timestampSecond: number): Date => {
  return new Date(timestampSecond * 1000);
};

export const getCurrentSecondsSinceEpochFrom = (date: Date): number =>
  date.getTime() / 1000;

export const currentSecondsSinceEpoch = (): number =>
  getCurrentSecondsSinceEpochFrom(new Date());
