import { Ionicons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';
import { CustomDrawerContent } from '~/src/components/Common/CustomDrawerContent';
import { CustomHeader } from '~/src/components/Common/CustomHeader';

const DrawerLayout = () => {
  return (
    <Drawer
      drawerContent={CustomDrawerContent}
      screenOptions={{
        headerShown: false,
        header: ({ options }) => <CustomHeader options={options} />,
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
