import { View, ScrollView, useColorScheme as useCScheme } from 'react-native';
import ThemeSelector from '~/src/components/Common/ThemeSelector';
import { Text } from '~/src/components/ui/typography';

export default function Settings() {
  return (
    <ScrollView className="flex-1 bg-gray-200 dark:bg-gray-950">
      <View className="p-4">
        <Text size="lg" weight={'bold'} className="mb-2 px-2">
          Theme
        </Text>

        {/* Theme Selector Component */}
        <ThemeSelector />
      </View>
    </ScrollView>
  );
}
