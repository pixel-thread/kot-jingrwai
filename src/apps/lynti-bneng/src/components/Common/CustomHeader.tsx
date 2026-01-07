import { useRouter } from "expo-router";
import type { ReactNode } from "react";
import { Header } from "@repo/ui-native";

type Props = {
  options?: { title?: string };
  back?: boolean;
  headerLeft?: ReactNode;
  headerRight?: ReactNode;
};

export const CustomHeader: React.FC<Props> = ({ back, options, headerLeft, headerRight }) => {
  const router = useRouter();
  return (
    <Header
      back={back ? () => router.back() : undefined}
      options={options}
      headerLeft={headerLeft}
      headerRight={headerRight}
    />
  );
};
