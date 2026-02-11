import { View } from "react-native";
import { Text } from "../ui/typography";
import Reanimated, { FadeInDown } from "react-native-reanimated";
import { cn } from "@repo/libs";
import { PropsWithChildren } from "react";
// Helper components
type ContentSectionProps = PropsWithChildren<{
  title: string;
  className?: string;
}>;

export const ContentSection = ({ title, children, className }: ContentSectionProps) => {
  return (
    <Reanimated.View entering={FadeInDown.duration(500)} className="mb-6">
      <Text size="lg" weight={"bold"} className="mb-2 px-2 text-gray-800 dark:text-gray-200">
        {title}
      </Text>
      <View
        className={cn(
          className,
          "overflow-hidden rounded-xl border border-gray-300 dark:border-gray-800"
        )}>
        {children}
      </View>
    </Reanimated.View>
  );
};
