import { songs } from "~/src/libs/songs";
import { http, isConnectedToNetwork } from "@repo/utils-native";
import { SONG_ENDPOINTS } from "@repo/constants";
import { SongT } from "@repo/types";

export async function getUniqueSongs({ id }: { id: string }): Promise<SongT | null> {
  const isOnline = await isConnectedToNetwork();

  if (isOnline) {
    const res = await http.get<SongT>(SONG_ENDPOINTS.GET_SONG.replace(":id", id));
    return res.data;
  }

  const data = songs.find((song) => song.id === id);

  return data || null;
}
