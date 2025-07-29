import FontAwesome from '@expo/vector-icons/FontAwesome';

import { Tabs } from 'expo-router';
import { useColorScheme } from 'nativewind';
import colors from 'tailwindcss/colors';
import { CustomHeader } from '~/src/components/Common/CustomHeader';
import { TouchableOpacity, View } from 'react-native';
import { TabBarIcon } from '~/src/components/Common/TabBarIcon';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { useThemeStore } from '~/src/libs/stores/theme';
import { useEffect } from 'react';
import { useSharedValue, withTiming } from 'react-native-reanimated';

const HeaderRight = () => {
  const { theme, setTheme } = useThemeStore();
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <View className="flex-row gap-x-4">
      <TouchableOpacity
        onPress={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className="h-10 w-10 items-center justify-center rounded-full bg-white/30 dark:bg-gray-800/40">
        <FontAwesome
          name={theme === 'light' ? 'moon-o' : 'sun-o'}
          size={20}
          color={isDarkMode ? colors.gray[200] : colors.gray[950]}
        />
      </TouchableOpacity>
    </View>
  );
};

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
            headerRight={<HeaderRight />}
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
        name="chorus"
        options={{
          title: 'Ki Khorus',
          tabBarIcon: ({ color }) => <TabBarIcon name="music" color={color} />,
        }}
      />
    </Tabs>
  );
}
