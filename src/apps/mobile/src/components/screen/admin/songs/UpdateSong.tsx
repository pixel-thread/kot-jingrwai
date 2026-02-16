import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { z } from "zod";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";

import { Container, Text, Button, Input } from "@repo/ui-native";
import { PrayerItem } from "./PrayerItem";
import { ParagraphItem } from "./ParagraphItem";
import { SongSchema, http } from "@repo/utils";
import { cn } from "@repo/libs";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ADMIN_SONG_ENDPOINT } from "@repo/constants";
import { SongT } from "@repo/types";
import { useEffect } from "react";

type SongFormValues = z.infer<typeof SongSchema>;

const source = ["KOT_JINGRWAI", "LYNTI_BNENG"];

export function UpdateSong() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const { data: songData, isLoading: isLoadingSong } = useQuery({
    queryKey: ["song", id],
    queryFn: () => http.get<SongT>(`/admin/songs/${id}`),
    enabled: !!id,
    select: (data) => data.data,
  });

  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(SongSchema),
    defaultValues: {
      metadata: {
        source: "KOT_JINGRWAI",
        tags: [],
      },
    },
  });

  useEffect(() => {
    if (songData) {
      reset(songData as SongFormValues);
    }
  }, [songData, reset]);

  const { isPending, mutate } = useMutation({
    mutationFn: (data: SongFormValues) =>
      http.put(ADMIN_SONG_ENDPOINT.PUT_UPDATE_SONG.replace(":id", id), data),
    onSuccess: (data) => {
      if (data.success) {
        // router.back();
        return data;
      }
      return data;
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

  const onSubmit = async (data: SongFormValues) => mutate(data);

  if (isLoadingSong) {
    return (
      <Container>
        <View className="flex-1 items-center justify-center">
          <Text>Loading...</Text>
        </View>
      </Container>
    );
  }

  return (
    <>
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
                Update Song
              </Text>

              <View className="gap-y-4">
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

                <View>
                  <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    App Source
                  </Text>
                  <Controller
                    control={control}
                    name="metadata.source"
                    render={({ field: { onChange, value } }) => (
                      <ScrollView horizontal className="flex-row gap-3">
                        {source.map((item) => (
                          <TouchableOpacity
                            key={item}
                            onPress={() => onChange(item)}
                            className={cn(
                              "mx-2 flex-1 items-center justify-center rounded-lg border p-3",
                              value === item
                                ? "border-indigo-600 bg-indigo-600"
                                : "border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
                            )}>
                            <Text
                              className={cn(
                                "font-medium",
                                value === item ? "text-white" : "text-gray-700 dark:text-gray-300"
                              )}>
                              {item.replace("_", " ")}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    )}
                  />
                </View>

                <View className="flex-row gap-4">
                  <View className="flex-1">
                    <Controller
                      control={control}
                      name="metadata.number"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          label="Song Number"
                          placeholder="e.g. 42"
                          keyboardType="numeric"
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={String(value || "")}
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
                    appendParagraph([
                      {
                        order: prayerFields.length + 1,
                        type: "VERSE",
                        lines: [{ text: "", isPaidBah: false, order: paragraphFields.length + 1 }],
                      },
                    ])
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
                    appendPrayer({
                      lines: [
                        {
                          text: "",
                          isPaidBah: false,
                          order: prayerFields.length + 1,
                        },
                      ],
                    })
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
              title="Update Song"
              onPress={handleSubmit(onSubmit)}
              loading={isSubmitting || isPending}
              size="lg"
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </Container>
    </>
  );
}

