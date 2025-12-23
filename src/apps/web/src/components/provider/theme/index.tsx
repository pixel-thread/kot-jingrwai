import { ThemeProvider } from "next-themes";

export const NxThemeProvider = ({
  children,
  ...props
}: React.ComponentProps<typeof ThemeProvider>) => {
  return <ThemeProvider {...props}>{children}</ThemeProvider>;
};
