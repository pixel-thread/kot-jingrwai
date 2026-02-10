export const convertUTCToIST = (utcDate: Date): Date => {
  // IST = UTC + 5:30
  const istOffsetMs = 5.5 * 60 * 60 * 1000; // 5 hours 30 min
  return new Date(utcDate.getTime() + istOffsetMs);
};
