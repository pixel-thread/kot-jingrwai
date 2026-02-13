import { zodResolver } from "@hookform/resolvers/zod";
import { Stack, useRouter } from "expo-router";
import { Control, Controller, useFieldArray, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { z } from "zod";
import clsx from "clsx";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Container, Text, Button } from "@repo/ui-native";

// --- Schema ---

const songFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  metadata: z.object({
    number: z.string().min(1, "Number is required"), // Keep as string in form
    language: z.string().optional(),
    author: z.string().optional(),
    composer: z.string().optional(),
    syllables: z.string().optional(),
  }),
  paragraphs: z.array(
    z.object({
      type: z.enum(["VERSE", "CHORUS"]).default("VERSE"),
      lines: z.array(
        z.object({
          text: z.string().min(1, "Line text is required"),
        })
      ),
    })
  ),
});

type SongFormValues = z.infer<typeof songFormSchema>;

// --- Components ---

interface InputProps extends React.ComponentProps<typeof TextInput> {
  label?: string;
  error?: string;
}

const Input = ({ label, error, className, ...props }: InputProps) => {
  return (
    <View className="mb-4 space-y-1">
      {label && (
        <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</Text>
      )}
      <TextInput
        className={clsx(
          "h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-base text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-white",
          error && "border-red-500 bg-red-50 dark:border-red-900 dark:bg-red-900/10",
          className
        )}
        placeholderTextColor="#9ca3af"
        {...props}
      />
      {error && <Text className="text-xs text-red-500">{error}</Text>}
    </View>
  );
};

const ParagraphItem = ({
  paragraphIndex,
  control,
  removeParagraph,
  register,
  errors,
}: {
  paragraphIndex: number;
  control: Control<any>;
  removeParagraph: (index: number) => void;
  register: any;
  errors: any;
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `paragraphs.${paragraphIndex}.lines`,
  });

  return (
    <View className="mb-6 rounded-2xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900/50">
      <View className="mb-4 flex-row items-center justify-between">
        <Text className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Block {paragraphIndex + 1}
        </Text>
        <TouchableOpacity
          onPress={() => removeParagraph(paragraphIndex)}
          className="rounded-full bg-red-100 p-2 dark:bg-red-900/30">
          <MaterialCommunityIcons name="delete-outline" size={20} color="#ef4444" />
        </TouchableOpacity>
      </View>

      <View className="mb-4 flex-row gap-2">
        <Controller
          control={control}
          name={`paragraphs.${paragraphIndex}.type`}
          render={({ field: { onChange, value } }) => (
            <View className="flex-row gap-2">
              {(["VERSE", "CHORUS"] as const).map((type) => (
                <TouchableOpacity
                  key={type}
                  onPress={() => onChange(type)}
                  className={clsx(
                    "rounded-lg border px-4 py-2",
                    value === type
                      ? "border-indigo-600 bg-indigo-600"
                      : "border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
                  )}>
                  <Text
                    className={clsx(
                      "text-sm font-medium",
                      value === type ? "text-white" : "text-gray-600 dark:text-gray-400"
                    )}>
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        />
      </View>

      <View className="space-y-3">
        {fields.map((field, lineIndex) => (
          <View key={field.id} className="flex-1 flex-row items-center gap-2">
            <Controller
              control={control}
              name={`paragraphs.${paragraphIndex}.lines.${lineIndex}.text`}
              render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <View className="my-1 flex-1">
                  <TextInput
                    className={clsx(
                      "h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-base text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white",
                      error && "border-red-500"
                    )}
                    placeholder={`Line ${lineIndex + 1}`}
                    placeholderTextColor="#9ca3af"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                </View>
              )}
            />
            <TouchableOpacity onPress={() => remove(lineIndex)} className="p-2">
              <MaterialCommunityIcons name="close" size={20} color="#9ca3af" />
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity
          onPress={() => append({ text: "" })}
          className="mt-2 flex-row items-center justify-center rounded-lg border border-dashed border-gray-300 p-3 dark:border-gray-700">
          <MaterialCommunityIcons name="plus" size={20} color="#6b7280" />
          <Text className="ml-2 text-sm font-medium text-gray-500">Add Line</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// --- Main Screen ---

export function AddSong() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<SongFormValues>({
    resolver: zodResolver(songFormSchema),
    defaultValues: {
      title: "",
      metadata: {
        number: "",
        language: "khasi",
        author: "",
        composer: "",
        syllables: "",
      },
      paragraphs: [
        {
          type: "VERSE",
          lines: [{ text: "" }, { text: "" }, { text: "" }, { text: "" }],
        },
      ],
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

  const onSubmit = async (data: SongFormValues) => {
    // Transform data for payload
    const payload = {
      ...data,
      metadata: {
        ...data.metadata,
        number: parseInt(data.metadata.number, 10),
      },
    };

    console.log(JSON.stringify(payload, null, 2));
    await new Promise((resolve) => setTimeout(resolve, 1000));
    router.back();
  };

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
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          label="Song Number"
                          placeholder="e.g. 42"
                          keyboardType="numeric"
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
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
                    appendParagraph({ type: "VERSE", lines: [{ text: "" }, { text: "" }] })
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
