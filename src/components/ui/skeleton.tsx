import { View } from 'react-native';

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className }: SkeletonProps) => {
  return <View className={`rounded bg-gray-300 dark:bg-gray-700 ${className}`} />;
};
