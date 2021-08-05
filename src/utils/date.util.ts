export const toDate = (timestampSecond: number): Date => {
  return new Date(timestampSecond * 1000);
};

// ref: https://pubs.opengroup.org/onlinepubs/9699919799/basedefs/V1_chap04.html#tag_04_15
export const getCurrentSecondsSinceEpochFrom = (date: Date): number =>
  date.getTime() / 1000;

export const currentSecondsSinceEpoch = (): number =>
  getCurrentSecondsSinceEpochFrom(new Date());
