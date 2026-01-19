import { CustomHeader } from "@/src/components/Common/CustomHeader";
import { KiJingDuawaiItem } from "@/src/components/screen/ki-jingduwai/kiJingduwaiItems";
import { kiJingDuwai } from "@/src/libs/constants/ki-jing-duwai";
import { Container } from "@repo/ui-native";
import { FlashList } from "@shopify/flash-list";
import { Stack, useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";

export default function page() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const jingduwai = kiJingDuwai.find((item) => item.id === id);

  if (!jingduwai) {
    return null;
  }

  const item = jingduwai.items;

  return (
    <>
      <Stack.Screen
        options={{
          title: jingduwai.title,
          header: ({ options }) => <CustomHeader back options={options} />,
          headerShown: true,
        }}
      />
      <Container>
        <ScrollView showsVerticalScrollIndicator={false} className="p-5">
          <FlashList
            estimatedItemSize={20}
            data={item}
            renderItem={({ item }) => <KiJingDuawaiItem item={item} />}
          />
        </ScrollView>
      </Container>
    </>
  );
}
