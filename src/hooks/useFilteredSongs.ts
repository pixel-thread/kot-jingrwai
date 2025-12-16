import { normalizeForSearch } from '../utils/normalizeTextForSearch';
import { SongT } from '../types/song';
import { getSongs } from '../services/song/getSongs';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

type UseFilteredSongsProps = {
  searchQuery?: string;
  isKhorus?: boolean;
};

export const useFilteredSongs = ({
  searchQuery = '',
  isKhorus = false,
}: UseFilteredSongsProps): SongT[] => {
  const querykey = ['songs', { khorus: isKhorus }];

  const query = searchQuery.trim();

  const {
    data: dataSource,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: querykey,
    queryFn: async () => await getSongs({ isChorus: isKhorus }),
  });

  useEffect(() => {
    refetch();
  }, [isKhorus, refetch]);

  if (!dataSource || isFetching) {
    return [];
  }

  // If no query, return all songs from the selected source
  if (!query) return dataSource;

  const normalizedQuery = normalizeForSearch(query);

  return dataSource.filter(({ title, metadata, paragraphs }) => {
    const searchFields = [
      title,
      metadata.author,
      metadata.composer,
      metadata.number?.toString(),
      paragraphs[0]?.lines[0].text,
    ].filter(Boolean); // Remove null/undefined values

    return searchFields.some((field) => {
      const normalizedField = normalizeForSearch(field ?? '');
      return normalizedField?.includes(normalizedQuery);
    });
  });
};
