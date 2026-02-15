import { zodResolver } from "@hookform/resolvers/zod";
import { Stack, useRouter } from "expo-router";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { z } from "zod";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Container, Text, Button, Input } from "@repo/ui-native";
import { PrayerItem } from "./PrayerItem";
import { ParagraphItem } from "./ParagraphItem";
import { SongSchema, SongMetadataSchema, PrayerSchema, logger } from "@repo/utils";

const FormPrayerSchema = PrayerSchema.omit({ value: true }).extend({
  lines: z.array(z.string().min(1, "Line cannot be empty")),
  isPaidbah: z.boolean(),
  value: z.string().optional(),
});

const FormSongSchema = SongSchema.extend({
  metadata: SongMetadataSchema.extend({
    number: z.coerce
      .number()
      .int("Song number must be an integer")
      .positive("Song number must be positive")
      .max(9999, "Song number too high (max 9999)"),
    tags: z.array(z.string()).default([]),
  }),
  prayers: z.array(FormPrayerSchema).optional().nullable(),
});

type SongFormValues = z.infer<typeof FormSongSchema>;

export function AddSong() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(FormSongSchema),
    defaultValues: {
      metadata: {
        tags: [],
      },
    },
  });

  const {
    fields: paragraphFields,
    append: appendParagraph,
    remove: removeParagraph,
  } = useFieldArray({
    control,
    name: "paragraphs",
  });

  const {
    fields: prayerFields,
    append: appendPrayer,
    remove: removePrayer,
  } = useFieldArray({
    control,
    name: "prayers",
  });

  const onSubmit = async (data: SongFormValues) => {
    // Transform data for payload
    const payload = {
      ...data,
      prayers: data.prayers?.map((prayer) => ({
        ...prayer,
        value: prayer.lines.join("\n"),
      })),
    };
    console.log(JSON.stringify(payload, null, 2));
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };
  logger.log("AddSong render", errors);
  return (
    <>
      <Stack.Screen options={{ title: "Add Song", headerBackTitle: "Back" }} />
      <Container>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}>
          <ScrollView
            contentContainerStyle={{
              padding: 16,
              paddingBottom: insets.bottom + 100,
            }}
            className="space-y-6"
            showsVerticalScrollIndicator={false}>
            {/* Metadata Section */}
            <View>
              <Text className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                New Song
              </Text>

              <View className="space-y-4">
                <Controller
                  control={control}
                  name="title"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      label="Song Title"
                      placeholder="e.g. Great is Thy Faithfulness"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      error={errors.title?.message}
                    />
                  )}
                />

                <View className="flex-row gap-4">
                  <View className="flex-1">
                    <Controller
                      control={control}
                      name="metadata.number"
                      render={({ field: { onChange, onBlur } }) => (
                        <Input
                          label="Song Number"
                          placeholder="e.g. 42"
                          keyboardType="numeric"
                          onBlur={onBlur}
                          onChangeText={onChange}
                          error={errors.metadata?.number?.message}
                        />
                      )}
                    />
                  </View>
                  <View className="flex-1">
                    <Controller
                      control={control}
                      name="metadata.language"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          label="Language"
                          placeholder="e.g. Khasi"
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value || ""}
                          error={errors.metadata?.language?.message}
                        />
                      )}
                    />
                  </View>
                </View>

                <Controller
                  control={control}
                  name="metadata.author"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      label="Author"
                      placeholder="Optional"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value || ""}
                      error={errors.metadata?.author?.message}
                    />
                  )}
                />
              </View>
            </View>

            {/* Lyrics Section */}

            <View>
              <View className="mb-4 flex-row items-center justify-between">
                <Text className="text-xl font-bold text-gray-900 dark:text-white">Lyrics</Text>
                <TouchableOpacity
                  onPress={() =>
                    appendParagraph({
                      type: "VERSE",
                      lines: [""],
                      order: paragraphFields.length + 1,
                    })
                  }
                  className="flex-row items-center rounded-lg bg-indigo-50 px-3 py-2 dark:bg-indigo-900/30">
                  <MaterialCommunityIcons name="plus" size={16} color="#4f46e5" />
                  <Text className="ml-1 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                    Add Block
                  </Text>
                </TouchableOpacity>
              </View>

              <View>
                {paragraphFields.map((field, index) => (
                  <ParagraphItem
                    key={field.id}
                    paragraphIndex={index}
                    control={control}
                    removeParagraph={removeParagraph}
                    register={register}
                    errors={errors}
                  />
                ))}
              </View>
            </View>

            <View>
              <View className="mb-4 flex-row items-center justify-between">
                <Text className="text-xl font-bold text-gray-900 dark:text-white">Prayer</Text>
                <TouchableOpacity
                  onPress={() =>
                    appendPrayer([
                      {
                        isPaidbah: true,
                        value: "",
                        order: prayerFields.length + 1,
                        lines: [""],
                      },
                    ])
                  }
                  className="flex-row items-center rounded-lg bg-indigo-50 px-3 py-2 dark:bg-indigo-900/30">
                  <MaterialCommunityIcons name="plus" size={16} color="#4f46e5" />
                  <Text className="ml-1 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                    Add Prayer Block
                  </Text>
                </TouchableOpacity>
              </View>

              <View>
                {prayerFields.map((field, index) => (
                  <PrayerItem
                    key={field.id}
                    paragraphIndex={index}
                    control={control}
                    removeParagraph={removePrayer}
                    register={register}
                    errors={errors}
                  />
                ))}
              </View>
            </View>

            <Button
              title="Save Song"
              onPress={handleSubmit(onSubmit)}
              loading={isSubmitting}
              size="lg"
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </Container>
    </>
  );
}
