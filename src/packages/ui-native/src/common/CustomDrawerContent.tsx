import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Text } from "../typography";
import { MenuItemsT } from "@repo/types";
import * as Constants from "expo-constants";
import { buttonVariants } from "../button";
import { cn } from "@repo/libs";
import { truncateText } from "@repo/utils";

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
        {items.map((item, i) => {
          const isActive = item.href === pathName;
          return (
            <View key={item.id + item.title} className="my-0.5">
              <TouchableOpacity
                onPress={() => onPress(item.href)}
                className={buttonVariants({
                  variant: isActive ? "primary" : "secondary",
                  className: "w-full",
                })}>
                <View className="w-full flex-1 flex-row items-start justify-start gap-2 px-1">
                  <Text
                    weight={"semibold"}
                    size={"md"}
                    className={cn(isActive ? "text-white" : "text-gray-800 dark:text-white")}>
                    {i + 1}.
                  </Text>
                  <Text
                    weight={"semibold"}
                    size={"md"}
                    className={cn(
                      "tracking-wide",
                      isActive ? "text-white" : "text-gray-800 dark:text-white"
                    )}>
                    {truncateText({ text: item.title, maxLength: 30 })}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </DrawerContentScrollView>
  );
}
