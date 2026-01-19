export const normalizeForSearch = (text: string) =>
  text
    ?.replace(/[^\w\s]/g, "") // Remove all punctuation
    .replace(/\s+/g, " ") // Normalize spaces
    .toLowerCase()
    .trim();
