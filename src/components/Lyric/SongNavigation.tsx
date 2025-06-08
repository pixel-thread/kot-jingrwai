import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Button } from '../Button';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useSongStore } from '~/src/libs/stores/songs';
import { Container } from '../Container';

type SongNavigationProps = {
  onNext: () => void;
  onPrevious: () => void;
  songNumber: number;
};

export const SongNavigation = ({ onNext, onPrevious, songNumber }: SongNavigationProps) => {
  const { favoriteSongs, addFavoriteSong, removeFavoriteSong } = useSongStore();
  const isFavorite = favoriteSongs.includes(songNumber);
  const onClickFavorite = () => {
    if (isFavorite) {
      removeFavoriteSong(songNumber);
    } else {
      addFavoriteSong(songNumber);
    }
  };
  return (
    <Container className="absolute bottom-0 left-0 right-0 px-5 py-4 backdrop-blur-md  ">
      <View className="flex-row items-center justify-between gap-x-5">
        {/* <Button title="Previous" onPress={onPrevious} className="mr-3 flex-1" /> */}
        <TouchableOpacity onPress={onClickFavorite}>
          <FontAwesome
            name={isFavorite ? 'heart' : 'heart-o'}
            size={24}
            color={isFavorite ? 'red' : 'black'}
          />
        </TouchableOpacity>
        {/* <Button title="Next" onPress={onNext} className="ml-3 flex-1" /> */}
      </View>
    </Container>
  );
};
