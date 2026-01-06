import { Stack } from 'expo-router';
import { CustomHeader } from '~/src/components/Common/CustomHeader';
import { ThemeToggle } from '@repo/ui-native';
import { AboutScreen } from '~/src/components/screen/about';
import Reanimated, { FadeIn } from 'react-native-reanimated';

export default function page() {
  return (
    <Reanimated.View entering={FadeIn.duration(300)} className="flex-1">
      <Stack.Screen
        name="Shaphang Jongngi"
        options={{
          header: ({ options }) => (
            <CustomHeader options={options} back headerRight={<ThemeToggle />} />
          ),
          title: 'Shaphang Jongngi',
          headerShown: true,
          headerTitleAlign: 'center',
          headerBackTitle: 'Back',
        }}
      />
      <AboutScreen />
    </Reanimated.View>
  );
}
