import { useQuery } from '@tanstack/react-query';
import { SONG_ENDPOINTS } from '~/src/libs/endpoints/song';
import { Track } from '@repo/types';
import http from '~/src/utils/http';

type Props = {
  id: string;
};

export function useSongTrack({ id }: Props) {
  return useQuery({
    queryKey: ['track', id],
    queryFn: () => http.get<Track>(SONG_ENDPOINTS.GET_SONG_TRACK.replace(':id', id)),
    select: ({ data }) => data,
    enabled: id !== '',
  });
}
