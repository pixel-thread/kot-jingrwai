const OTP_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes

export const isOtpExpired = (data: Date) => {
  const createdAt = new Date(data).getTime();

  if (Number.isNaN(createdAt)) {
    throw new Error("Invalid date format for OTP");
  }

  return Date.now() - createdAt > OTP_EXPIRY_MS;
};
