/**
 * Converts minutes to milliseconds.
 * Example: getTimeInMin(1) => 60000
 */
function getTimeInMin(minutes: number): number {
  if (minutes <= 0 || !Number.isFinite(minutes)) {
    throw new Error("Minutes must be a positive number");
  }

  return minutes * 60 * 1000;
}

/**
 * Converts seconds to milliseconds.
 * Example: getTimeInSec(10) => 10000
 */
function getTimeInSec(seconds: number): number {
  if (seconds <= 0 || !Number.isFinite(seconds)) {
    throw new Error("Seconds must be a positive number");
  }

  return seconds * 1000;
}

/**
 * Converts hours to milliseconds.
 * Example: getTimeInHour(1) => 3600000
 */
function getTimeInHour(hours: number): number {
  if (!Number.isFinite(hours) || hours <= 0) {
    throw new Error("Hours must be a positive number");
  }

  return hours * 60 * 60 * 1000;
}

/**
 * Converts days to milliseconds.
 * Example: getTimeInDay(1) => 86400000
 */
function getTimeInDay(days: number): number {
  if (!Number.isFinite(days) || days <= 0) {
    throw new Error("Days must be a positive number");
  }

  return days * 24 * 60 * 60 * 1000;
}

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
