import { SafeAreaView, ViewProps } from "react-native";
import { cn } from "@repo/libs";
import { PropsWithChildren } from "react";

type ContainerProps = PropsWithChildren<ViewProps>;

export const Container = ({ children, className }: ContainerProps) => {
  return (
    <SafeAreaView
      className={cn(className, "flex flex-1 bg-gray-200 dark:bg-gray-900")}
    >
      {children}
    </SafeAreaView>
  );
};
