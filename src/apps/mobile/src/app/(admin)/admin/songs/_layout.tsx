import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { CustomHeader } from "~/src/components/Common/CustomHeader";

const HeaderRight = () => {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.push("/admin/songs/add-song")}>
      <MaterialCommunityIcons name="plus" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default function songLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: "Songs",
        header: ({ options }) => {
          return <CustomHeader options={options} back headerRight={<HeaderRight />} />;
        },
      }}
    />
  );
}
