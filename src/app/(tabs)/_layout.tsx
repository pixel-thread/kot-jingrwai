import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router, Tabs } from 'expo-router';
import { useColorScheme } from 'nativewind';
import colors from 'tailwindcss/colors';
import { CustomHeader } from '~/src/components/Common/CustomHeader';
import { View } from 'react-native';
import { Dropdown } from '~/src/components/Common/DropDown';

const actionButtons = [
  {
    label: 'Contact',
    icon: 'contacts',
    onPress: () => router.push(`/contact`),
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
        },
        header: ({ options }) => <CustomHeader options={options} headerLeft={<HeaderLeft />} />,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Ka Kot Jingrwai',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
          headerShown: true,
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
          title: 'Ki Khorus',
          tabBarIcon: ({ color }) => <AntDesign size={28} name="book" color={color} />,
        }}
      />
    </Tabs>
  );
}
