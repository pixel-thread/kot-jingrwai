import { normalizeForSearch } from '../utils/normalizeTextForSearch';
import { SongT } from '../types/song';
import { useQuery } from '@tanstack/react-query';
import { songs } from '../libs/songs';

type UseFilteredSongsProps = {
  searchQuery?: string;
  isKhorus?: boolean;
};

export const useFilteredSongs = ({
  searchQuery = '',
  isKhorus = false,
}: UseFilteredSongsProps): SongT[] => {
  // Load songs once (offline-first, perfect for Expo)
  const { data: allSongs = [] } = useQuery({
    queryKey: ['songs'],
    queryFn: () => songs,
    staleTime: Infinity, // Never refetch - static data
    gcTime: Infinity, // Never garbage collect
  });

  // Filter by isKhorus (instant, reactive)
  const filteredByChorus = isKhorus
    ? allSongs.filter((song) => song.metadata.isChorus === true)
    : allSongs;

  // Early return if no search
  if (!searchQuery.trim()) {
    return filteredByChorus;
  }

  const normalizedQuery = normalizeForSearch(searchQuery.trim());

  return filteredByChorus.filter(({ title, metadata, paragraphs }) => {
    const searchFields = [
      title,
      metadata.author,
      metadata.composer,
      metadata.number?.toString(),
      paragraphs[0]?.lines[0].text,
    ].filter(Boolean);

    return searchFields.some((field) => {
      const normalizedField = normalizeForSearch(field ?? '');
      return normalizedField?.includes(normalizedQuery);
    });
  });
};
