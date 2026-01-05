import { View } from "react-native";
import { cn } from "@repo/libs";

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <View className={cn("rounded bg-gray-300 dark:bg-gray-700", className)} />
  );
};
