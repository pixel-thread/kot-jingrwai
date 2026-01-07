import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { ScrollView, View } from "react-native";
import { Text } from "../typography";
import { MenuItemsT } from "@repo/types";
import * as Constants from "expo-constants";
import { Button } from "../button";

interface Props extends DrawerContentComponentProps {
  items: MenuItemsT[];
  pathName: string;
  onPress: (href: string) => void;
  imageUrl?: { uri: string } | number;
}

export function CustomDrawerContent({
  items = [],
  onPress,
  pathName,
  imageUrl,
  ...props
}: Props & DrawerContentComponentProps) {
  const appName = Constants.default.expoConfig?.name;
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0, flex: 1 }}>
      <View className="items-center p-4">
        <Text className="mt-5 uppercase" weight={"bold"} size={"xl"}>
          {appName}
        </Text>
      </View>

      <DrawerItemList {...props} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {items.map((item) => {
          const isActive = item.href === pathName;
          return (
            <View className="my-0.5">
              <Button
                key={item.id}
                textClassName="text-start!"
                title={item.title}
                variant={isActive ? "primary" : "secondary"}
                size={"sm"}
                onPress={() => onPress(item.href)}
              />
            </View>
          );
        })}
      </ScrollView>
    </DrawerContentScrollView>
  );
}
