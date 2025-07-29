import { Stack } from 'expo-router';
import { View, ScrollView } from 'react-native';
import { CustomHeader } from '~/src/components/Common/CustomHeader';
import ThemeSelector from '~/src/components/Common/ThemeSelector';
import { Text } from '~/src/components/ui/typography';

export default function Settings() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Settings',
          headerBackVisible: true,
          headerShown: true,
          headerTitleAlign: 'center',
          headerBackTitle: 'Back',
          header: ({ options }) => <CustomHeader options={options} back />,
        }}
      />
      <ScrollView className="flex-1 bg-gray-200 dark:bg-gray-950">
        <View className="p-4">
          <Text size="lg" weight={'bold'} className="mb-2 px-2">
            Theme
          </Text>

          {/* Theme Selector Component */}
          <ThemeSelector />
        </View>
      </ScrollView>
    </>
  );
}
