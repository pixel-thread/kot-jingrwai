import { useQuery } from '@tanstack/react-query';
import { SONG_ENDPOINTS } from '@repo/constants';
import { TrackT } from '@repo/types';
import { http } from '@repo/utils';

type Props = {
  id: string;
};

export function useSongTrack({ id }: Props) {
  return useQuery({
    queryKey: ['track', id],
    queryFn: () => http.get<TrackT>(SONG_ENDPOINTS.GET_SONG_TRACK.replace(':id', id)),
    select: ({ data }) => data,
    enabled: id !== '',
  });
}
