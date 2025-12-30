import { songs } from '~/src/libs/songs';
import { featuredSongs } from '@repo/constants';
import { SongT } from '@repo/types';

function getMonthDayValue(date: Date): number {
  return (date.getMonth() + 1) * 100 + date.getDate();
}

export function getFeaturedSongs(): SongT[] {
  const todayValue = getMonthDayValue(new Date());

  // Create lookup map for non-chorus songs
  const songMap = new Map(
    songs.filter((song) => !song.metadata.isChorus).map((song) => [song.metadata.number, song])
  );

  return featuredSongs
    .filter((featured) => {
      const startValue = getMonthDayValue(new Date(featured.startDate));
      const endValue = getMonthDayValue(new Date(featured.endDate));

      // Normal range (e.g. Mar → Apr)
      if (startValue <= endValue) {
        return todayValue >= startValue && todayValue <= endValue;
      }

      // Cross-year range (e.g. Dec → Jan)
      return todayValue >= startValue || todayValue <= endValue;
    })
    .flatMap((featured) => featured.songsNo)
    .map((songNo) => songMap.get(songNo))
    .filter((song): song is NonNullable<typeof song> => Boolean(song));
}
