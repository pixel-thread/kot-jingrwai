import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import { gray } from "tailwindcss/colors";
import { useColorScheme } from "nativewind";
import { CustomDrawerContent } from "@repo/ui-native";
import { CustomHeader } from "@/src/components/Common/CustomHeader";
import { Route, usePathname, useRouter } from "expo-router/build";
import { drawerMenuItems } from "@libs/constants/drawerItems";

const DrawerLayout = () => {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const router = useRouter();
  const pathName = usePathname();

  const onPress = (href: Route) => router.push(href);

  return (
    <Drawer
      drawerContent={(props: any) => (
        <CustomDrawerContent
          items={drawerMenuItems}
          pathName={pathName}
          onPress={(href) => onPress(href as Route)}
          {...props}
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
