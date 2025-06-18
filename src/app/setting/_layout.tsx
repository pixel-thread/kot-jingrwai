import { Stack } from 'expo-router';
import { CustomHeader } from '~/src/components/Common/CustomHeader';

export default function ContactLayout() {
  return (
    <Stack
      screenOptions={{
        title: 'Setting',
        headerShown: true,
        header: ({ options }) => <CustomHeader options={options} back />,
      }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
