import { useRouter } from "expo-router";
import type { ReactNode } from "react";
import { Header, ThemeToggle } from "@repo/ui-native";
import { useThemeStore } from "@repo/libs";

type Props = {
  options?: { title?: string };
  back?: boolean;
  headerLeft?: ReactNode;
  headerRight?: ReactNode;
};

export const CustomHeader: React.FC<Props> = ({ back, options, headerLeft, headerRight }) => {
  const router = useRouter();
  const { theme, setTheme } = useThemeStore();
  return (
    <Header
      back={back ? () => router.back() : undefined}
      options={options}
      headerLeft={headerLeft}
      headerRight={!headerRight ? <ThemeToggle theme={theme} setTheme={setTheme} /> : headerRight}
    />
  );
};
