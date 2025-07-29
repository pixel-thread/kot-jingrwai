import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router, Tabs } from 'expo-router';
import { useColorScheme } from 'nativewind';
import colors from 'tailwindcss/colors';
import { CustomHeader } from '~/src/components/Common/CustomHeader';
import { TouchableOpacity, View } from 'react-native';
import { Dropdown, DropdownActionButton } from '~/src/components/Common/DropDown';
import { TabBarIcon } from '~/src/components/Common/TabBarIcon';
import { Button } from '~/src/components/ui/button';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { useThemeStore } from '~/src/libs/stores/theme';

const actionButtons: DropdownActionButton[] = [
  {
    label: 'Contact',
    icon: 'contacts',
    onPress: () => router.push(`/contact`),
  },
  {
    label: 'Setting',
    icon: 'setting',
    onPress: () => router.push(`/setting`),
  },
];

const HeaderRight = () => {
  const { theme, setTheme } = useThemeStore();
  return (
    <View className="flex-row gap-x-4">
      <TouchableOpacity onPress={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        <FontAwesome
          name={theme === 'light' ? 'moon-o' : 'sun-o'}
          size={20}
          color={theme === 'light' ? colors.gray[950] : colors.gray[200]}
        />
      </TouchableOpacity>
    </View>
  );
};

export default function TabLayout() {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: isDarkMode ? colors.gray[950] : colors.gray[200],
          borderColor: isDarkMode ? colors.gray[950] : colors.gray[200],
          height: 60,
        },
        header: ({ options }) => (
          <CustomHeader
            options={options}
            headerLeft={<DrawerToggleButton />}
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
          title: 'Ki Jing Rwai',
          tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} />,
        }}
      />
      <Tabs.Screen
        name="chorus"
        options={{
          title: 'Khorus',
          tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} />,
        }}
      />
    </Tabs>
  );
}
