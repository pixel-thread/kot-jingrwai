import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import { CustomDrawerContent } from "@repo/ui-native";
import { CustomHeader } from "~/src/components/Common/CustomHeader";
import { gray } from "tailwindcss/colors";
import { useColorScheme } from "nativewind";
import { drawerMenuItems } from "~/src/libs/constants/drawerMenuItems";
import { Route, usePathname, useRouter } from "expo-router";

const DrawerLayout = () => {
  const { colorScheme } = useColorScheme();
  const pathName = usePathname();
  const router = useRouter();
  const isDarkMode = colorScheme === "dark";

  const onPressItems = (href: string) => router.push(href as Route);
  return (
    <Drawer
      drawerContent={(props) => (
        <CustomDrawerContent
          {...props}
          items={drawerMenuItems}
          onPress={(href) => onPressItems(href)}
          pathName={pathName}
        />
      )}
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
          drawerLabel: "Home",
          drawerIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
          drawerItemStyle: { display: "none" },
        }}
      />
    </Drawer>
  );
};

export default DrawerLayout;
