import { useSongTrack } from "@hooks/song/useSongTrack";
import { SongT } from "@repo/types";
import { useQuery } from "@tanstack/react-query";
import { getSongs } from "@services/songs/getSongs";
import { useRouter } from "expo-router";
import { MusicPlayer } from "@repo/ui-native/common/MusicPlayer";

type Props = {
  song: SongT;
};

export const MiniMusicPlayer = ({ song }: Props) => {
  const router = useRouter();

  const { data: songTrack, isFetching } = useSongTrack({ id: song.id || "" });

  const { data: songs } = useQuery({
    queryKey: ["songs"],
    queryFn: () => getSongs({ isAll: true }),
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

  const isDisabled = songTrack?.metadata.downloadUrl ? isFetching : true;

  const isTrackExist = songTrack?.metadata.downloadUrl ? true : false;

  return (
    <MusicPlayer
      musicUrl={songTrack?.metadata.downloadUrl || ""}
      song={song}
      onNextSong={onNextSong}
      onPreviousSong={onPreviousSong}
      isLoading={isTrackExist ? false : true}
      isDisabled={isDisabled}
    />
  );
};
