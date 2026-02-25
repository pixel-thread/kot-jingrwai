import { router, Tabs } from "expo-router";
import { useColorScheme } from "nativewind";
import colors from "tailwindcss/colors";
import { CustomHeader } from "~/src/components/Common/CustomHeader";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { useEffect } from "react";
import { useSharedValue, withTiming } from "react-native-reanimated";
import { ThemeToggle, TabBarIcon } from "@repo/ui-native";
import { useUpdateContext } from "@repo/hooks";
import { TouchableOpacity, View } from "react-native";
import { useThemeStore } from "@repo/libs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const HeaderRight = () => {
  const { theme, setTheme } = useThemeStore();
  const onClickAddNewSong = () => router.push("/admin/songs/add-song");
  return (
    <View className="flex-1 flex-row items-center justify-end gap-4 pr-14">
      <ThemeToggle theme={theme} setTheme={setTheme} />
      <TouchableOpacity
        onPress={onClickAddNewSong}
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
        <MaterialCommunityIcons size={24} name="plus" color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default function TabLayout() {
  const context = useUpdateContext();
  const { theme, setTheme } = useThemeStore();
  const { isUpdateAvailable } = context!;
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  // Animation values
  const tabBarOpacity = useSharedValue(0);

  useEffect(() => {
    // Animate tab bar when component mounts
    tabBarOpacity.value = withTiming(1, { duration: 800 });
  }, [tabBarOpacity]);

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: isDarkMode ? colors.gray[900] : colors.gray[200],
          borderTopWidth: 0,
          elevation: 0,
          height: 65,
          shadowOpacity: 0,
          borderTopColor: "transparent",
        },
        tabBarLabelStyle: {
          fontFamily: "Helvetica",
          fontSize: 12,
          fontWeight: "600",
        },
        tabBarActiveTintColor: isDarkMode ? colors.indigo[200] : colors.indigo[600],
        tabBarInactiveTintColor: isDarkMode ? colors.gray[400] : colors.gray[500],
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          title: "Home",
          header: ({ options }) => (
            <CustomHeader
              options={options}
              headerLeft={
                <>
                  {isUpdateAvailable && (
                    <View className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-red-500" />
                  )}
                  <DrawerToggleButton
                    tintColor={isDarkMode ? colors.gray[200] : colors.gray[950]}
                  />
                </>
              }
              headerRight={<ThemeToggle theme={theme} setTheme={setTheme} />}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="songs"
        options={{
          title: "Ki Jingrwai",
          tabBarIcon: ({ color }) => <TabBarIcon name="music-note" color={color} />,
          header: ({ options }) => (
            <CustomHeader
              options={options}
              headerLeft={
                <>
                  {isUpdateAvailable && (
                    <View className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-red-500" />
                  )}
                  <DrawerToggleButton
                    tintColor={isDarkMode ? colors.gray[200] : colors.gray[950]}
                  />
                </>
              }
              headerRight={<HeaderRight />}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="khorus"
        options={{
          title: "Ki Khorus",
          tabBarIcon: ({ color }) => <TabBarIcon name="music" color={color} />,
          header: ({ options }) => (
            <CustomHeader
              options={options}
              headerLeft={
                <>
                  {isUpdateAvailable && (
                    <View className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-red-500" />
                  )}
                  <DrawerToggleButton
                    tintColor={isDarkMode ? colors.gray[200] : colors.gray[950]}
                  />
                </>
              }
              headerRight={<HeaderRight />}
            />
          ),
        }}
      />
    </Tabs>
  );
}
