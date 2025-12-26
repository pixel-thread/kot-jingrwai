import { Ionicons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';
import { CustomDrawerContent } from '~/src/components/Common/CustomDrawerContent';
import { CustomHeader } from '~/src/components/Common/CustomHeader';
import { gray } from 'tailwindcss/colors';
import { useColorScheme } from 'nativewind';

const DrawerLayout = () => {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  return (
    <Drawer
      drawerContent={CustomDrawerContent}
      screenOptions={{
        headerShown: false,
        header: ({ options }) => <CustomHeader options={options} />,
        drawerStyle: {
          width: 300,
          backgroundColor: isDarkMode ? gray[900] : gray[200],
        },
      }}>
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: 'Home',
          drawerIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
          drawerItemStyle: { display: 'none' },
        }}
      />
    </Drawer>
  );
};

export default DrawerLayout;
