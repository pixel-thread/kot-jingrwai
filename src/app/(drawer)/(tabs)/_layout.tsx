import { Tabs } from 'expo-router';
import { useColorScheme } from 'nativewind';
import colors from 'tailwindcss/colors';
import { CustomHeader } from '~/src/components/Common/CustomHeader';
import { TabBarIcon } from '~/src/components/Common/TabBarIcon';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { useEffect } from 'react';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { ThemeToggle } from '~/src/components/Common/theme/ThemeToggle';

export default function TabLayout() {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  // Animation values
  const tabBarOpacity = useSharedValue(0);

  useEffect(() => {
    // Animate tab bar when component mounts
    tabBarOpacity.value = withTiming(1, { duration: 800 });
  }, [tabBarOpacity]);

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: isDarkMode ? colors.gray[900] : colors.gray[100],
          borderTopWidth: 0,
          elevation: 0,
          height: 65,
          shadowOpacity: 0,
          borderTopColor: 'transparent',
        },
        tabBarLabelStyle: {
          fontFamily: 'Helvetica',
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarActiveTintColor: isDarkMode ? colors.indigo[400] : colors.indigo[600],
        tabBarInactiveTintColor: isDarkMode ? colors.gray[400] : colors.gray[500],
        header: ({ options }) => (
          <CustomHeader
            options={options}
            headerLeft={
              <DrawerToggleButton tintColor={isDarkMode ? colors.gray[200] : colors.gray[950]} />
            }
            headerRight={<ThemeToggle />}
          />
        ),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          title: 'Kot Jingrwai',
        }}
      />
      <Tabs.Screen
        name="songs"
        options={{
          title: 'Ki JingRwai',
          tabBarIcon: ({ color }) => <TabBarIcon name="music-note" color={color} />,
        }}
      />
      <Tabs.Screen
        name="khorus"
        options={{
          title: 'Ki Khorus',
          tabBarIcon: ({ color }) => <TabBarIcon name="music" color={color} />,
        }}
      />
    </Tabs>
  );
}
