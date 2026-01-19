import { KiJingDuwaiItemsT } from "@/src/types/ki-jing-kdew/ki-jing-duwai";
import { Ternary, Text } from "@repo/ui-native";
import { View } from "react-native";

type Props = {
  item: KiJingDuwaiItemsT;
};

export const KiJingDuawaiItem = ({ item }: Props) => {
  return (
    <View key={item.id} className="flex-1 gap-4 py-3">
      <View>
        <Text size={"3xl"} weight={"bold"} className="text-center uppercase">
          {item.title}
        </Text>
      </View>
      <View>
        <Text className="text-justify" size={"xl"}>
          {item.desc}
        </Text>
      </View>
      {item.prayerLines && item?.prayerLines?.length > 0 && (
        <View className="gap-2">
          {item.prayerLines?.map((item) => (
            <View key={item.id} className="flex-1 flex-row gap-2">
              <Ternary
                condition={item.order.length === 1}
                ifTrue={
                  <Text className="text-start" size={"xl"}>
                    -
                  </Text>
                }
                ifFalse={
                  <Text className="text-start" size={"xl"}>
                    &nbsp;
                  </Text>
                }
              />
              <Text className="text-start" size={"xl"}>
                {item.line}
              </Text>
            </View>
          ))}
        </View>
      )}
      <Ternary
        condition={!!item.nTag}
        ifTrue={
          <View className="flex-1 flex-row gap-x-2">
            <Text weight={"bold"}>N.</Text>
            <Text className="text-start" italic size={"xl"}>
              {item.nTag}
            </Text>
          </View>
        }
        ifFalse={null}
      />
      <Ternary
        condition={!!item.pTag}
        ifTrue={
          <View className="flex-1 flex-row gap-x-2">
            <Text weight={"bold"}>P.</Text>
            <Text className="text-start" italic size={"xl"}>
              {item.pTag}
            </Text>
          </View>
        }
        ifFalse={null}
      />
    </View>
  );
};
