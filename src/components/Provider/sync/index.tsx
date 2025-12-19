import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { SyncContext } from '~/src/context/sync';
import { SONG_ENDPOINTS } from '~/src/libs/endpoints/song';
import { getUniqueSongs } from '~/src/services/songs/getUniqueSong';
import { updateSong } from '~/src/services/songs/updateSong';
import { SongT } from '~/src/types/song';
import http from '~/src/utils/http';
import { isBackendNewer } from '~/src/utils/isBackendNewer';
import { Banner } from '../../Common/Banner';

type Props = {
  children: React.ReactNode;
  id: string;
};

type UpdateMutationT = {
  id: string;
  data: SongT;
};

export const SyncManager = ({ children, id }: Props) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const queryClient = useQueryClient();

  const localQuery = useQuery({
    queryKey: ['song', id],
    queryFn: async () => await getUniqueSongs({ id }),
    enabled: !!id,
  });

  const backendQuery = useQuery({
    queryKey: ['song-backend', id],
    queryFn: async () => http.get<SongT>(SONG_ENDPOINTS.GET_SONG.replace(':id', id)),
    select: (data) => data.data,
    enabled: !!id && isSyncing,
    refetchInterval: 5000,
  });

  const mutate = useMutation({
    mutationKey: ['song', id],
    mutationFn: (data: UpdateMutationT) => updateSong(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['song', id] });
      queryClient.invalidateQueries({ queryKey: ['songs'] });
      setTimeout(() => setIsSyncing(false), 2000);
    },
  });

  const sync = useCallback(() => {
    if (!id) return;

    const isDataReady =
      backendQuery.isFetched &&
      localQuery.isFetched &&
      !backendQuery.isFetching &&
      !localQuery.isFetching;

    const localData = localQuery.data; // Get local song
    const backendData = backendQuery.data;

    const backendDate = backendData?.updatedAt || '';
    const sqliteDate = parseInt(localData?.updatedAt || '0');

    if (!isBackendNewer({ backendDate, sqliteDate })) return;
    if (isDataReady) {
      mutate.mutate({ id, data: backendData! });
      setIsSyncing(true);
    }
  }, [
    id,
    localQuery.data,
    backendQuery.data,
    backendQuery.isFetched,
    localQuery.isFetched,
    backendQuery.isFetching,
    localQuery.isFetching,
  ]);

  useEffect(() => {
    sync();
  }, [sync, id]);

  const value = {
    isSyncing,
    syncAll: () => {},
    sync,
  };

  return (
    <SyncContext.Provider value={value}>
      <Banner message="Syncing" isShown={isSyncing} />
      {children}
    </SyncContext.Provider>
  );
};
