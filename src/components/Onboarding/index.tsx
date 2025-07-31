import React, { useState, useRef, useEffect } from 'react';
import { View, FlatList, Dimensions, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Text } from '~/src/components/ui/typography';
import { useColorScheme } from 'nativewind';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Reanimated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useOnboardingStore } from '~/src/libs/stores/onboarding';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

type OnboardingItemProps = {
  title: string;
  description: string;
  image: any;
};

const onboardingData: OnboardingItemProps[] = [
  {
    title: 'Ka Kot Jingrwai',
    description: 'Your complete collection of Khasi hymns and songs at your fingertips.',
    image: require('../../../assets/icons/kot-jingrwai-icon.png'),
  },
  {
    title: 'Browse Songs',
    description: 'Easily search and browse through hundreds of songs organized by categories.',
    image: require('../../../assets/icons/kot-jingrwai-icon.png'),
  },
  {
    title: 'Customize Your Experience',
    description: 'Adjust text size, enable dark mode, and personalize your reading experience.',
    image: require('../../../assets/icons/kot-jingrwai-icon.png'),
  },
  {
    title: 'Use Offline Anytime',
    description: 'No internet? No problem. Access all songs and features even when offline.',
    image: require('../../../assets/icons/kot-jingrwai-icon.png'),
  },
  {
    title: 'Ready to Begin',
    description: 'Start exploring the rich collection of Khasi hymns and songs now!',
    image: require('../../../assets/icons/kot-jingrwai-icon.png'),
  },
];

const OnboardingItem = ({ item }: { item: OnboardingItemProps }) => {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <View style={{ width, height: height * 0.8 }} className="items-center justify-center px-8">
      <Reanimated.View entering={FadeIn.duration(500)} className="items-center">
        {/* <Image source={item.image} className="bg-gray-200 dark:bg-gray-900" style={styles.image} /> */}
        <Text
          size="4xl"
          weight="bold"
          tracking={'widest'}
          className="mt-8 text-center text-gray-800 dark:text-gray-100">
          {item.title}
        </Text>
        <Text
          size="xl"
          tracking={'wider'}
          weight={'semibold'}
          className="mt-4 text-center text-gray-600 dark:text-gray-300">
          {item.description}
        </Text>
      </Reanimated.View>
    </View>
  );
};

const Paginator = ({
  data,
  currentIndex,
}: {
  data: OnboardingItemProps[];
  currentIndex: number;
}) => {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <View className="flex-row justify-center">
      {data.map((_, index) => {
        const isActive = index === currentIndex;
        return (
          <View
            key={index}
            className={`mx-2 h-2.5 rounded-full ${isActive ? 'w-6 bg-blue-500 dark:bg-blue-400' : 'w-2.5 bg-gray-300 dark:bg-gray-700'}`}
          />
        );
      })}
    </View>
  );
};

export default function Onboarding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesRef = useRef<FlatList>(null);
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const { setHasCompletedOnboarding } = useOnboardingStore();

  const viewableItemsChanged = useRef(({ viewableItems }: any) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = (index: number) => {
    if (slidesRef.current) {
      slidesRef.current.scrollToIndex({ index });
    }
  };

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      scrollTo(currentIndex + 1);
    } else {
      completeOnboarding();
    }
  };

  const handleSkip = () => {
    completeOnboarding();
  };

  const completeOnboarding = () => {
    setHasCompletedOnboarding(true);
    router.replace('/');
  };

  return (
    <View className="flex-1 bg-gray-200 dark:bg-gray-950">
      <Reanimated.View entering={FadeIn} className="flex-1">
        <FlatList
          data={onboardingData}
          renderItem={({ item }) => <OnboardingItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.title}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </Reanimated.View>

      <Reanimated.View entering={FadeInUp.duration(500)} className="mb-12 px-8">
        <Paginator data={onboardingData} currentIndex={currentIndex} />

        <View className="mt-8 flex-row items-center justify-between">
          {currentIndex < onboardingData.length - 1 ? (
            <TouchableOpacity onPress={handleSkip}>
              <Text size="md" weight="medium" className="text-gray-500 dark:text-gray-400">
                Skip
              </Text>
            </TouchableOpacity>
          ) : (
            <View />
          )}

          <TouchableOpacity
            onPress={handleNext}
            className="rounded-full bg-indigo-500 px-8 py-3 dark:bg-indigo-600">
            <Text size="md" weight="semibold" className="text-white">
              {currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </Reanimated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    borderRadius: 20,
  },
});
