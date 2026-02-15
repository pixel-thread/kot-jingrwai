import { Control, Controller, useFieldArray } from "react-hook-form";
import { TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, Input as TextInput } from "@repo/ui-native";
import { cn } from "@repo/libs";

type PrayerItemProps = {
  paragraphIndex: number;
  control: Control<any>;
  removeParagraph: (index: number) => void;
  register: any;
  errors: any;
};

export const PrayerItem = ({
  paragraphIndex,
  control,
  removeParagraph,
  errors,
}: PrayerItemProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `prayers.${paragraphIndex}.lines`,
  });

  return (
    <View className="mb-6 rounded-2xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900/50">
      <View className="mb-4 flex-row items-center justify-between">
        <Text className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Prayer {paragraphIndex + 1}
        </Text>
        <TouchableOpacity
          onPress={() => removeParagraph(paragraphIndex)}
          className="rounded-full bg-red-100 p-2 dark:bg-red-900/30">
          <MaterialCommunityIcons name="delete-outline" size={20} color="#ef4444" />
        </TouchableOpacity>
      </View>
      {errors?.prayers?.[paragraphIndex]?.lines?.message && (
        <Text className="mb-2 text-xs text-red-500">
          {errors.prayers[paragraphIndex].lines.message}
        </Text>
      )}

      <View className="space-y-3">
        <View className="flex-col items-start gap-2">
          {/* isPaidbah Toggle */}
          <View className="flex-row gap-2">
            {(["NONGIALAM", "PAIDBAH"] as const).map((type) => (
              <Controller
                key={type}
                control={control}
                name={`prayers.${paragraphIndex}.isPaidbah`}
                render={({ field: { onChange, value } }) => (
                  <TouchableOpacity
                    onPress={() => onChange(type === "PAIDBAH")}
                    className={cn(
                      "rounded-lg border px-4 py-2",
                      (type === "PAIDBAH" && value) || (type === "NONGIALAM" && !value)
                        ? "border-indigo-600 bg-indigo-600"
                        : "border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
                    )}>
                    <Text
                      className={cn(
                        "text-sm font-medium",
                        (type === "PAIDBAH" && value) || (type === "NONGIALAM" && !value)
                          ? "text-white"
                          : "text-gray-600 dark:text-gray-400"
                      )}>
                      {type}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            ))}
          </View>

          {/* Lines */}
          {fields.map((field, lineIndex) => (
            <View key={field.id} className="w-full flex-row items-start gap-2">
              <Controller
                control={control}
                name={`prayers.${paragraphIndex}.lines.${lineIndex}`}
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                  <View className="my-1 flex-1">
                    <TextInput
                      className={cn(
                        "h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-base text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white",
                        error && "border-red-500"
                      )}
                      placeholder={`Line ${lineIndex + 1}`}
                      placeholderTextColor="#9ca3af"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                    {error && <Text className="mt-1 text-xs text-red-500">{error.message}</Text>}
                  </View>
                )}
              />
              <TouchableOpacity onPress={() => remove(lineIndex)} className="p-2 pt-3">
                <MaterialCommunityIcons name="close" size={20} color="#9ca3af" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};
