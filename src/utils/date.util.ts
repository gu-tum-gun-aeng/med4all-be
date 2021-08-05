export const toDate = (timestampSecond: number): Date => {
  return new Date(timestampSecond * 1000);
};
