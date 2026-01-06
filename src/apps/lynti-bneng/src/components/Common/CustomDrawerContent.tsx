import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { usePathname, useRouter } from 'expo-router';
import { Image, View } from 'react-native';
import { Text } from '@repo/ui-native';
import { MenuItemsT } from '@repo/types';
import { useColorScheme } from 'nativewind';
import colors from 'tailwindcss/colors';
import * as Constants from 'expo-constants';

const menuItems: MenuItemsT[] = [{ id: 1, title: 'Home', herf: '/' }];

export function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const router = useRouter();
  const pathname = usePathname();
  const appName = Constants.default.expoConfig?.name;
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0, flex: 1 }}>
      <View className="items-center p-4">
        <Image
          source={require('@/src/assets/images/splashscreen/splashscreen.png')}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
        <Text className="mt-5 uppercase" weight={'bold'} size={'xl'}>
          {appName}
        </Text>
      </View>

      <DrawerItemList {...props} />
      <>
        {menuItems.map((item) => {
          return (
            <View key={item.id} className="relative">
              <DrawerItem
                focused={pathname === item.herf}
                label={item.title}
                onPress={() => router.push(item.herf)}
                labelStyle={{
                  textTransform: 'capitalize',
                  color: isDarkMode ? colors.gray[200] : colors.gray[950],
                  fontWeight: 'bold',
                }}
              />
            </View>
          );
        })}
      </>
    </DrawerContentScrollView>
  );
}
