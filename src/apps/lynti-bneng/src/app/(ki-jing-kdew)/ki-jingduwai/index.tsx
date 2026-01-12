import { CustomHeader } from "@/src/components/Common/CustomHeader";
import { KiJingUDwaiScreen } from "@/src/components/screen/ki-jingduwai";
import { Stack } from "expo-router";

export default function page() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Ki Jingduwai",
          header: ({ options }) => <CustomHeader back options={options} />,
          headerShown: true,
        }}
      />
      <KiJingUDwaiScreen />
    </>
  );
}
