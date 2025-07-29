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
import { FontAwesome, Ionicons } from '@expo/vector-icons';

export function CustomDrawerContent(props: DrawerContentComponentProps) {
  const menuItems: MenuItemsT[] = [
    {
      id: 2,
      title: 'Apostle Creed',
      herf: 'apostle-creed',
      icon: 'music',
    },
    { id: 3, title: 'Contact', herf: 'contact', icon: 'phone-square' },
    {
      id: 4,
      title: 'Settings',
      herf: 'setting',
      icon: 'music',
    },
  ];
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
      <View className="p-4 pt-0">
        <Text weight={'bold'} size={'md'}>
          Content
        </Text>
      </View>

      {menuItems.map((item) => {
        const isActive = pathname === `/${item.id}`;
        return (
          <DrawerItem
            focused={isActive}
            key={item.id}
            icon={({ color, size }) => <FontAwesome name={item.icon} size={size} color={color} />}
            label={item.title}
            // @ts-ignore
            onPress={() => router.push(`/${item.herf}`)}
            labelStyle={{
              textTransform: 'capitalize',
              color: isActive ? '#000' : '#000',
              fontWeight: isActive ? 'bold' : 'normal',
              fontSize: 16,
              elevation: 1,
            }}
          />
        );
      })}
    </DrawerContentScrollView>
  );
}
