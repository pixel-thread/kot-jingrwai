import { View } from 'react-native';
import { Text } from '~/src/components/ui/typography';
import Reanimated, { FadeInDown } from 'react-native-reanimated';
// Helper components
type ContentSectionProps = {
  title: string;
  children: React.ReactNode;
};

export const ContentSection = ({ title, children }: ContentSectionProps) => {
  return (
    <Reanimated.View entering={FadeInDown.duration(500)} className="mb-6">
      <Text size="lg" weight={'bold'} className="mb-2 px-2 text-gray-800 dark:text-gray-200">
        {title}
      </Text>
      <View className="overflow-hidden rounded-xl border border-gray-300 dark:border-gray-800">
        {children}
      </View>
    </Reanimated.View>
  );
};
