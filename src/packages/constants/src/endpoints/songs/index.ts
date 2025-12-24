import { type EndpointT } from "@repo/types";

type SongEndpointsKey = "GET_SONGS";

export const SONG_ENDPOINT: EndpointT<SongEndpointsKey> = {
  GET_SONGS: "/songs",
};
