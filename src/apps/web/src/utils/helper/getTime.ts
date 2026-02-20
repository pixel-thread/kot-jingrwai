type TimeUnit = "s" | "m" | "h" | "d";

/**
 * Converts a time value + unit to milliseconds.
 * Example:
 * getTime(1, "m") => 60000
 * getTime(2, "h") => 7200000
 */
export function getTime(value: number, unit: TimeUnit): number {
  if (!Number.isFinite(value) || value <= 0) {
    throw new Error("Value must be a positive number");
  }

  const oneSecond = 1000;
  const oneMinute = 60 * oneSecond;
  const oneHour = 60 * oneMinute;
  const oneDay = 24 * oneHour;

  switch (unit) {
    case "s":
      return value * oneSecond;
    case "m":
      return value * oneMinute;
    case "h":
      return value * oneHour;
    case "d":
      return value * oneDay;
    default:
      throw new Error(`Unsupported time unit: ${unit}`);
  }
}
