import { View } from 'react-native';
import { cn } from '~/src/libs/cn';
import { SongT } from '~/src/types/song';
import { Text } from '~/src/components/ui/typography';
import { useSongStore } from '~/src/libs/stores/songs';
import { useEffect } from 'react';
import { useTextStore } from '~/src/libs/stores/text';
import { Gesture, GestureDetector, ScrollView } from 'react-native-gesture-handler';
import { useAnimatedRef } from 'react-native-reanimated';
import { useTapGesture } from '~/src/hooks/useTapGesture';
import { useSwipeGesture } from '~/src/hooks/useSwipeGesture';
import { useSongs } from '~/src/hooks/song/useSongs';
import { Ternary } from '../Common/Ternary';

type LyricViewProps = {
  song: SongT;
};

export const LyricView = ({ song }: LyricViewProps) => {
  const scrollRef = useAnimatedRef<ScrollView>();
  const { size } = useTextStore();
  const { addRecentlyPlayedSong } = useSongStore();
  const title = song.title;
  const paragraphs = song.paragraphs;
  const sortedParagraphs = [...paragraphs].sort((a, b) => a.order - b.order);

  const { onNextSong, onPreviousSong } = useSongs();
  const { addFavoriteSong, favoriteSongs, removeFavoriteSong } = useSongStore();
  const isFavorite = favoriteSongs.includes(song.metadata.number);
  const sectionCount: Record<string, number> = {};

  useEffect(() => {
    addRecentlyPlayedSong(song);
  }, [addRecentlyPlayedSong, song]);

  const doubleTap = () => {
    if (isFavorite) {
      removeFavoriteSong(song.metadata.number);
    } else {
      addFavoriteSong(song.metadata.number);
    }
  };

  const doubleTapGesture = useTapGesture({
    onTap: doubleTap,
    numberOfTaps: 2,
    simultaneousRef: scrollRef,
  });

  const leftRightGesture = useSwipeGesture({
    onSwipeLeft: onNextSong,
    onSwipeRight: onPreviousSong,
    simultaneousRef: scrollRef,
    threshold: 100,
  });

  const combinedGesture = Gesture.Simultaneous(doubleTapGesture, leftRightGesture);

  useEffect(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  }, [song.metadata.number, scrollRef]);

  return (
    <GestureDetector gesture={combinedGesture}>
      <ScrollView
        ref={scrollRef}
        simultaneousHandlers={scrollRef}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        className="mb-16 mt-3">
        <View className="flex-1" collapsable={false}>
          <View className="items-center px-4 ">
            <Text
              size={'3xl'}
              weight={'bold'}
              tracking="widest"
              leading={'tight'}
              className="mb-1 text-center text-gray-900 dark:text-gray-100">
              {title}
            </Text>
            {song.metadata.author && (
              <Text size={'sm'} variant={'muted'} className="text-center">
                {song.metadata.author}
              </Text>
            )}
            {song.metadata.composer && (
              <Text size={'xs'} variant={'muted'} className="text-center">
                {song.metadata.composer}
              </Text>
            )}
            {song.metadata.syllables && (
              <Text variant={'muted'} weight={'medium'} className="text-center">
                {song.metadata.syllables}
              </Text>
            )}
          </View>
          <View className="my-2 h-px w-2/3 self-center bg-gray-200 dark:bg-gray-800" />
          {/* Lyrics */}
          <View className="px-0">
            {sortedParagraphs.map((paragraph) => {
              const type = capitalize(paragraph.type ?? 'Verse');
              sectionCount[type] = (sectionCount[type] || 0) + 1;
              return (
                <View key={paragraph.id} className="flex-1 flex-col space-y-3 px-1">
                  {/* Paragraph Label */}
                  <View className="mb-1 mt-4 flex-row items-center justify-end">
                    <Text
                      italic={true}
                      size={'xs'}
                      variant={'muted'}
                      tracking={'wider'}
                      className="px-2 text-justify text-gray-500 dark:text-gray-400">
                      {type} {sectionCount[type] > 1 ? sectionCount[type] : ''}
                    </Text>
                  </View>
                  {/* Paragraph Box */}
                  <View className={cn(getParagraphStyle(paragraph.type), 'bg-transparent')}>
                    {paragraph.lines.map((line, index) => {
                      const isFirst = index === 0;
                      const isLast = index === paragraph.lines.length - 1;
                      const isChorus = paragraph.type === 'chorus';
                      const textContent = line;
                      return (
                        <Ternary
                          key={`${paragraph.id}-line-${index}`}
                          condition={isChorus}
                          ifTrue={
                            <View className="flex-1 flex-row">
                              {isFirst && <Text variant={'primary'} size={'xl'}>{`"`}</Text>}
                              <View className={isFirst ? 'flex-1 px-0' : isLast ? 'pl-2' : 'px-2'}>
                                <Text
                                  key={`${paragraph.id}-${isChorus ? 'chorus' : 'verse'}-line-${index}`}
                                  size={size}
                                  leading={'loose'}
                                  variant={'secondary'}
                                  weight={'normal'}
                                  italic
                                  tracking={'tighter'}
                                  align={'center'}
                                  className={cn('text-left')}>
                                  {textContent || ' '}
                                </Text>
                              </View>
                              {isLast && (
                                <Text variant={'primary'} weight={'bold'} size={'xl'}>{`"`}</Text>
                              )}
                            </View>
                          }
                          ifFalse={
                            <Text
                              key={`${paragraph.id}-line-${index}`}
                              size={size}
                              leading={'loose'}
                              weight={'bold'}
                              tracking={'tight'}
                              align={'center'}
                              className={cn('text-left text-gray-900 dark:text-gray-100')}>
                              {textContent || ' '}
                            </Text>
                          }
                        />
                      );
                    })}
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </GestureDetector>
  );
};

// Utility to get background style by paragraph type
const getParagraphStyle = (type?: string): string => {
  const baseStyle = 'p-2 rounded-lg border border-gray-200 dark:border-gray-950';

  switch (type) {
    case 'chorus':
      return `${baseStyle} bg-blue-100 dark:bg-blue-900/30`;
    case 'verse':
      return `${baseStyle} bg-gray-100 dark:bg-gray-800`;
    case 'bridge':
      return `${baseStyle} bg-purple-100 dark:bg-purple-900/30`;
    case 'intro':
      return `${baseStyle} bg-green-100 dark:bg-green-900/30`;
    case 'outro':
      return `${baseStyle} bg-yellow-100 dark:bg-yellow-900/30`;
    default:
      return `${baseStyle} bg-gray-50 dark:bg-neutral-800`;
  }
};

// Capitalizes first letter
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
