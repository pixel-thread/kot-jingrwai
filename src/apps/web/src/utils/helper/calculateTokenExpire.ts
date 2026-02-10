export const calculateTokenExpiry = (
  ttl: number,
  unit: "minutes" | "hours" | "days" | "seconds",
): Date => {
  switch (unit) {
    case "seconds":
      return new Date(Date.now() + ttl * 1000);
    case "minutes":
      return new Date(Date.now() + ttl * 60 * 1000);
    case "hours":
      return new Date(Date.now() + ttl * 60 * 60 * 1000);
    case "days":
      return new Date(Date.now() + ttl * 24 * 60 * 60 * 1000);
    default:
      throw new Error("Invalid unit. Use: minutes, hours, days");
  }
};
