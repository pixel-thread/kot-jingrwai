import { EndpointT } from "@/types/endpoints";

type SongEndpointsKey = "GET_SONGS";

export const SONG_ENDPOINT: EndpointT<SongEndpointsKey> = {
  GET_SONGS: "/songs",
};
