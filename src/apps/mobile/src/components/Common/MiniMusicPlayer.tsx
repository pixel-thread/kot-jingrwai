import { useSongTrack } from "~/src/hooks/song/useSongTrack";
import { SongT } from "@repo/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSongs } from "~/src/services/songs/getSongs";
import { useRouter } from "expo-router";
import { MusicPlayer, Ternary, Text } from "@repo/ui-native";
import { Platform, ToastAndroid, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import * as DocumentPicker from "expo-document-picker";
import { logger, truncateText } from "@repo/utils";
import { http } from "@repo/utils-native";
import React, { useState } from "react";
import { useAudioPlayer } from "expo-audio";
import { useAuth } from "@repo/hooks";

type Props = {
  song: SongT;
};

export type FileT = {
  name: string;
  uri: string;
  size: number;
  mimeType: string;
  type: "success";
};

export const MiniMusicPlayer = ({ song }: Props) => {
  const authContext = useAuth();
  const role = authContext?.role;
  const isUploadEnable = role === "ADMIN" || role === "SUPER_ADMIN";

  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const [file, setFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);

  const [isPlaying, setIsPlaying] = React.useState(false);

  const audioPlayer = useAudioPlayer(file?.uri);

  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: songTrack, isFetching } = useSongTrack({ id: song.id || "" });

  const { data: songs } = useQuery({
    queryKey: ["songs"],
    queryFn: () => getSongs({ isAll: true }),
  });

  const { mutate: deleteSongTrack } = useMutation({
    mutationKey: ["deleteSongTrack"],
    mutationFn: (id: { id: string }) => http.delete(`/admin/tracks/${id.id}`),
    onSuccess: (data) => {
      if (data.success) {
        ToastAndroid.show(data.message, ToastAndroid.SHORT);

        queryClient.invalidateQueries({
          queryKey: ["songs"],
        });

        queryClient.invalidateQueries({
          queryKey: ["track", song.id],
        });
        logger.info(data.message);
        return;
      }
      ToastAndroid.show(data.message, ToastAndroid.SHORT);
      logger.info(data.message);
      return;
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["uploadSong"],
    mutationFn: (form: FormData) =>
      http.post("/admin/tracks/upload", form, {
        timeout: 0, // infinite
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    onSuccess: (data) => {
      if (data.success) {
        ToastAndroid.show(data.message, ToastAndroid.SHORT);
        logger.info("Song Upload Success", {
          data,
        });

        queryClient.invalidateQueries({
          queryKey: ["songs"],
        });

        queryClient.invalidateQueries({
          queryKey: ["track", song.id],
        });
        return;
      }
      ToastAndroid.show(data.message, ToastAndroid.SHORT);
      logger.info("Song Upload Error", {
        data,
      });
      return;
    },
  });

  const changeSong = (isNext: boolean): string => {
    if (!songs) return "";

    const isCurrentSongChorus = !!song?.metadata.isChorus;

    if (song) {
      const currentSongNo = song?.metadata.number;

      const nextSongNo = isNext ? currentSongNo + 1 : currentSongNo - 1;

      const nextSongId = songs?.find(
        (song) =>
          song.metadata.number === nextSongNo && song.metadata.isChorus === isCurrentSongChorus
      )?.id;

      return nextSongId || "";
    }
    return "";
  };

  const onNextSong = () => {
    const idx = changeSong(true);
    if (idx) {
      router.replace(`/songs/${idx}`);
    }
  };

  const onPreviousSong = () => {
    const idx = changeSong(false);
    if (idx) {
      router.replace(`/songs/${idx}`);
    }
  };

  const isDisabled = songTrack?.metadata.downloadUrl ? false : isFetching;

  const isTrackExist = songTrack?.metadata.downloadUrl ? true : false;

  const OnClickUploadFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "audio/*",
    });
    if (result.assets) {
      const file = result?.assets[0];
      setFile(file);
      if (Platform.OS === "android") {
        ToastAndroid.show("File Selected", ToastAndroid.SHORT);
      }
    }
  };

  const onClickPlay = () => {
    if (file) {
      if (isPlaying) {
        audioPlayer.pause();
        setIsPlaying(false);
      } else {
        audioPlayer.play();
        setIsPlaying(true);
      }
    }
  };

  const onClickUpload = async () => {
    if (file) {
      const form = new FormData();
      form.append("file", {
        uri: file.uri,
        name: file.name,
        type: file.mimeType || "",
      } as any);

      form.append("songId", song.id || "");

      mutate(form);
    }
  };

  const onClickDelete = () => {
    if (songTrack?.id) {
      deleteSongTrack({ id: songTrack.id });
    }
  };

  if (!isUploadEnable && !isTrackExist) {
    return (
      <MusicPlayer
        song={song}
        musicUrl={songTrack?.metadata.downloadUrl || ""}
        onNextSong={onNextSong}
        onPreviousSong={onPreviousSong}
        isLoading={isTrackExist ? false : true}
        isDisabled={isDisabled}
      />
    );
  }

  return (
    <View className="flex-1 gap-y-2">
      <Ternary
        condition={isTrackExist}
        ifTrue={
          <>
            <View className="w-full flex-row justify-end">
              <TouchableOpacity
                onPress={onClickDelete}
                activeOpacity={0.8}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                className="bg-background  p-1">
                <MaterialCommunityIcons name="trash-can" size={20} color="red" />
              </TouchableOpacity>
            </View>
            <MusicPlayer
              musicUrl={songTrack?.metadata.downloadUrl || ""}
              song={song}
              onNextSong={onNextSong}
              onPreviousSong={onPreviousSong}
              isLoading={isTrackExist ? false : true}
              isDisabled={isDisabled}
            />
          </>
        }
        ifFalse={
          <TouchableOpacity
            onPress={() => OnClickUploadFile()}
            className="w-auto flex-1 flex-row items-center justify-between rounded-xl border border-gray-500/40 bg-black/5 px-2 py-2 dark:border-gray-800 dark:bg-gray-900/5">
            <View className="flex-1 flex-row items-center">
              <View className="mr-3 h-9 w-9 items-center justify-center rounded-lg bg-indigo-500 dark:bg-indigo-950">
                <MaterialCommunityIcons name="upload-outline" size={18} color="white" />
              </View>
              <View className="flex-1">
                <Text
                  numberOfLines={1}
                  className="text-xs font-semibold text-gray-900 dark:text-gray-50">
                  {isPending
                    ? "Uploading..."
                    : truncateText({
                        text: file?.name || "",
                      }) || "Select Audio"}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              disabled={isPending || file === null}
              onPress={() => onClickPlay()}
              className="h-8 w-8 items-center justify-center rounded-full bg-gray-900/5 dark:bg-gray-100/5">
              <MaterialCommunityIcons
                name={isPlaying ? "pause" : "play"}
                size={18}
                color={isDarkMode ? "white" : "black"}
              />
            </TouchableOpacity>

            <View className="ml-3 flex-row items-center gap-2">
              <TouchableOpacity
                disabled={isPending || file === null}
                onPress={() => onClickUpload()}
                className="h-8 w-8 items-center justify-center rounded-full bg-gray-900/5 dark:bg-gray-100/5">
                <MaterialCommunityIcons
                  name="upload"
                  size={18}
                  color={isDarkMode ? "white" : "black"}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        }
      />
    </View>
  );
};
