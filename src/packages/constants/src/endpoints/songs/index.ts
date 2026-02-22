import { EndpointT } from "@repo/types";

type SongEnpoints = "GET_SONGS" | "GET_SONG_TRACK" | "GET_SONG";

const source = process.env.EXPO_PUBLIC_APP_VARIANT;

export const SONG_ENDPOINTS: EndpointT<SongEnpoints> = {
  GET_SONGS: `/songs?source=${source}`,
  GET_SONG: "/songs/:id",
  GET_SONG_TRACK: "/songs/:id/track",
};
