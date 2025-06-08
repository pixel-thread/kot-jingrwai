import { Stack, usePathname } from 'expo-router';
import { CustomHeader } from './CustomHeader';
export const CustomStack = () => {
  const pathName = usePathname();
  const isHome = pathName === '/';
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: isHome ? 'Kot Ong Rwai' : 'Kot Ong Rwai',
        header: ({ back }) => <CustomHeader back={back} />,
        animation: 'ios_from_right',
        animationDuration: 400,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
};
