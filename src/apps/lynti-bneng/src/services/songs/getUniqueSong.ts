import { songs } from "@libs/songs";

export async function getUniqueSongs({ id }: { id: string }) {
  return songs.find((song) => song.id === id);
}
