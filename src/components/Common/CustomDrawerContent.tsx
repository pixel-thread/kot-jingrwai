import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { usePathname, useRouter } from 'expo-router';
import { Image, View } from 'react-native';
import { Text } from '../ui/typography';
import { MenuItemsT } from '~/src/types/MenuItems';
import { useColorScheme } from 'nativewind';
import colors from 'tailwindcss/colors';
const menuItems: MenuItemsT[] = [
  {
    id: 1,
    title: 'Home',
    herf: '',
  },
  {
    id: 2,
    title: 'Apostle Creed',
    herf: 'apostle-creed',
  },
  { id: 6, title: 'Tynrai Jingrwai', herf: 'tynrai-jingrwai' },
  { id: 3, title: 'Contact', herf: 'contact' },
  { id: 4, title: 'Report', herf: 'report' },
  {
    id: 5,
    title: 'Settings',
    herf: 'setting',
  },
];
export function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const router = useRouter();
  const pathname = usePathname();

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0, flex: 1 }}>
      <View className="items-center p-4">
        <Image
          source={require('~/assets/images/splashscreen/splashscreen.png')}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
        <Text className="mt-5 uppercase" weight={'bold'} size={'xl'}>
          Kot Jingrwai
        </Text>
      </View>

      <DrawerItemList {...props} />

      {menuItems.map((item) => (
        <DrawerItem
          focused={pathname === `/${item.herf}`}
          key={item.id}
          label={item.title}
          // @ts-ignore
          onPress={() => router.push(`/${item.herf}`)}
          labelStyle={{
            textTransform: 'capitalize',
            color: isDarkMode ? colors.gray[200] : colors.gray[950],
            fontWeight: 'bold',
          }}
        />
      ))}
    </DrawerContentScrollView>
  );
}
