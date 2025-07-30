import { Stack } from 'expo-router';
import { View } from 'react-native';
import { CustomHeader } from '~/src/components/Common/CustomHeader';
import { ThemeToggle } from '~/src/components/Common/theme/ThemeToggle';
import { ApostleCreedPage } from '~/src/components/screen/apostle-creed';

export default function page() {
  return (
    <View className="flex-1">
      <Stack.Screen
        options={{
          header: ({ options }) => (
            <CustomHeader options={options} back headerRight={<ThemeToggle />} />
          ),
          title: 'Apostle Creed',
          headerShown: true,
        }}
      />
      <ApostleCreedPage />
    </View>
  );
}
