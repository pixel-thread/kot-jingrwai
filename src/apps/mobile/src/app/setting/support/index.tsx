import { Stack } from 'expo-router';
import { CustomHeader } from '~/src/components/Common/CustomHeader';
import { ThemeToggle } from '@repo/ui-native';
import HelpSupportScreen from '~/src/components/screen/help-support';
import Reanimated, { FadeIn } from 'react-native-reanimated';

export default function page() {
  return (
    <Reanimated.View entering={FadeIn.duration(300)} className="flex-1">
      <Stack.Screen
        name="Help & Support"
        options={{
          header: ({ options }) => (
            <CustomHeader options={options} back headerRight={<ThemeToggle />} />
          ),
          title: 'Help & Support',
          headerShown: true,
          headerTitleAlign: 'center',
          headerBackTitle: 'Back',
        }}
      />
      <HelpSupportScreen />
    </Reanimated.View>
  );
}
