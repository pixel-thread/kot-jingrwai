import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router, Tabs } from 'expo-router';
import { useColorScheme } from 'nativewind';
import colors from 'tailwindcss/colors';
import { CustomHeader } from '~/src/components/Common/CustomHeader';
import { View } from 'react-native';
import { Dropdown, DropdownActionButton } from '~/src/components/Common/DropDown';

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

const HeaderLeft = () => {
  return (
    <View className="flex-row gap-x-4">
      <Dropdown buttons={actionButtons} />
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
        tabBarStyle: {
          backgroundColor: isDarkMode ? colors.gray[950] : colors.gray[200],
          borderColor: isDarkMode ? colors.gray[950] : colors.gray[200],
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 14,
        },
        header: ({ options }) => <CustomHeader options={options} headerLeft={<HeaderLeft />} />,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
          headerShown: true,
          title: 'Kot Jingrwai',
        }}
      />
      <Tabs.Screen
        name="songs"
        options={{
          title: 'Ki Jing Rwai',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="book" color={color} />,
        }}
      />
      <Tabs.Screen
        name="chorus"
        options={{
          title: 'Khorus',
          tabBarIcon: ({ color }) => <AntDesign size={28} name="book" color={color} />,
        }}
      />
    </Tabs>
  );
}
