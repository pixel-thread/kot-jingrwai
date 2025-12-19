import { normalizeForSearch } from '../utils/normalizeTextForSearch';
import { SongT } from '../types/song';
import { getSongs } from '../services/songs/getSongs';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

type UseFilteredSongsProps = {
  searchQuery?: string;
  isKhorus?: boolean;
  page?: number;
};

export const useFilteredSongs = ({
  searchQuery = '',
  isKhorus = false,
  page = 1,
}: UseFilteredSongsProps): SongT[] => {
  const query = searchQuery.trim();

  const { data: dataSource = [] } = useQuery({
    queryKey: ['songs', { khorus: isKhorus }, page],
    queryFn: async () => await getSongs({ isChorus: isKhorus, page }),
    placeholderData: keepPreviousData,
  });

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
