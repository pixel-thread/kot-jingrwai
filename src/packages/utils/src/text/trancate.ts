type OptionsT = {
  position?: "end" | "middle" | "start";
  ellipsis?: string;
};

type Props = {
  text: string;
  maxLength?: number;
  options?: OptionsT;
};

export const truncateText = ({ text, maxLength = 20, options }: Props): string => {
  const { position = "end", ellipsis = "..." } = { ...options }; // ✅ Default values

  const ellipsisLength = ellipsis.length; // ✅ Safe - defaults defined

  const displayLength = maxLength - ellipsisLength;

  if (text.length <= maxLength) return text;

  if (displayLength <= 0) return ellipsis; // ✅ Edge case protection

  const half = Math.floor(displayLength / 2);

  switch (position) {
    case "start":
      return ellipsis + text.slice(-displayLength);
    case "middle":
      return text.slice(0, half) + ellipsis + text.slice(-half);
    case "end":
    default:
      return text.slice(0, displayLength) + ellipsis;
  }
};
