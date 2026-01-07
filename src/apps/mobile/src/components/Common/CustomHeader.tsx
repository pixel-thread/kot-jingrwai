import { useRouter } from "expo-router";
import { Header } from "@repo/ui-native";
import type { ReactNode } from "react";

type Props = {
  options?: { title?: string };
  back?: boolean;
  headerLeft?: ReactNode;
  headerRight?: ReactNode;
};

export const CustomHeader: React.FC<Props> = ({ back, options, headerLeft, headerRight }) => {
  const router = useRouter();

  const onPressBackButton = () => router.back();

  return (
    <Header
      back={back ? onPressBackButton : undefined}
      headerLeft={headerLeft}
      headerRight={headerRight}
      options={options}
    />
  );
};
