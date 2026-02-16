import { normalizeForSearch } from "@utils/normalizeTextForSearch";
import { SongT } from "@repo/types";
import { useQuery } from "@tanstack/react-query";
import { http } from "@repo/utils-native";
import { SONG_ENDPOINTS } from "@repo/constants";

type UseFilteredSongsProps = {
  searchQuery?: string;
  isKhorus?: boolean;
};

export const useFilteredSongs = ({
  searchQuery = "",
  isKhorus = false,
}: UseFilteredSongsProps): SongT[] => {
  const query = searchQuery.trim();

  const { data: dataSource = [], isFetching } = useQuery({
    queryKey: ["songs", { isKhorus }],
    queryFn: () => http.get<SongT[]>(SONG_ENDPOINTS.GET_SONGS),
    select: ({ data }) => data,
  });

  // If no query, return all songs from the selected source
  if (!query) return dataSource || [];

  if (isFetching) return [];

  const normalizedQuery = normalizeForSearch(query);

  return (
    dataSource?.filter(({ title, metadata, paragraphs }) => {
      const searchFields = [
        title,
        metadata.author,
        metadata.composer,
        metadata.number?.toString(),
        paragraphs[0]?.lines[0].text,
      ].filter(Boolean); // Remove null/undefined values

      return searchFields.some((field) => {
        const normalizedField = normalizeForSearch(field ?? "");
        return normalizedField?.includes(normalizedQuery);
      });
    }) || []
  );
};
