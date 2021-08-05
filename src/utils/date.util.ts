export const toDate = (timestampSecond: number): Date => {
  return new Date(timestampSecond * 1000);
};

export const getNumericDateFrom = (dateTimeMillisecs: number): number =>
  dateTimeMillisecs / 1000;

export const currentNumericDate = (): number =>
  getNumericDateFrom(new Date().getTime());
