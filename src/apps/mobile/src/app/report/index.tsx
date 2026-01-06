import { Stack } from 'expo-router';
import { CustomHeader } from '~/src/components/Common/CustomHeader';
import ReportScreen from '~/src/components/screen/report';
import Reanimated, { FadeIn } from 'react-native-reanimated';
import { ThemeToggle } from '@repo/ui-native';

export default function page() {
  return (
    <Reanimated.View entering={FadeIn.duration(300)} className="flex-1">
      <Stack.Screen
        name="Report"
        options={{
          header: ({ options }) => (
            <CustomHeader options={options} back headerRight={<ThemeToggle />} />
          ),
          title: 'Report',
          headerShown: true,
          headerTitleAlign: 'center',
          headerBackTitle: 'Back',
        }}
      />
      <ReportScreen />
    </Reanimated.View>
  );
}
