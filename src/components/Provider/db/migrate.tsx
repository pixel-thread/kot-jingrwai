import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from '~/src/db/drizzle/migrations/migrations';
import { db } from '~/src/db/drizzle';
import { seedSongs } from '~/src/db/drizzle/seeder';
import { logger } from '~/src/utils/logger';

const { width } = Dimensions.get('window');

type Props = {
  children: React.ReactNode;
};

export function DBMigrationGate({ children }: Props) {
  const { success, error } = useMigrations(db, migrations);
  const [seedingState, setSeedingState] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle'
  );
  const [seedError, setSeedError] = useState<string | null>(null);

  const fadeAnim = new Animated.Value(0);
  const pulseAnim = new Animated.Value(1);

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Pulse animation for loading state
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    if (!success && !error) {
      pulseAnimation.start();
    } else {
      pulseAnimation.stop();
    }

    return () => pulseAnimation.stop();
  }, [success, error]);

  useEffect(() => {
    if (success && seedingState === 'idle') {
      setSeedingState('loading');
      seedSongs()
        .then(() => {
          setSeedingState('success');
          setSeedError(null);
        })
        .catch((err) => {
          setSeedingState('error');
          setSeedError(err.message || 'Seeding failed');
          logger.error({ message: err });
        });
    }
  }, [success, seedingState]);

  const handleRetry = () => {
    setSeedingState('loading');
    setSeedError(null);
    seedSongs()
      .then(() => {
        setSeedingState('success');
      })
      .catch((err) => {
        setSeedingState('error');
        setSeedError(err.message || 'Seeding failed');
      });
  };

  // Show children only when everything is complete
  if (success && seedingState === 'success') {
    return <>{children}</>;
  }

  // Error state
  if (error) {
    return (
      <View className="flex-1">
        <View className="flex-1 items-center justify-center">
          <Animated.View style={{ opacity: fadeAnim }} className="items-center px-10">
            <View className="mb-5">
              <Text className="text-center text-6xl">⚠️</Text>
            </View>
            <Text className="mb-3 text-center text-3xl font-bold text-white">Migration Failed</Text>
            <Text className="mb-10 text-center text-base leading-6 text-white/80">
              {error.message}
            </Text>
            <View className="flex-row items-center">
              <Text className="text-sm text-white/80">Please restart the application</Text>
            </View>
          </Animated.View>
        </View>
      </View>
    );
  }

  // Seeding error state
  if (seedingState === 'error') {
    return (
      <View className="flex-1">
        <View className="flex-1 items-center justify-center">
          <Animated.View style={{ opacity: fadeAnim }} className="items-center px-10">
            <View className="mb-5">
              <Text className="text-center text-6xl">🔄</Text>
            </View>
            <Text className="mb-3 text-center text-3xl font-bold text-white">Seeding Failed</Text>
            <Text className="mb-10 text-center text-base leading-6 text-white/80">{seedError}</Text>
            <TouchableOpacity
              className="rounded-full border border-white/30 bg-white/20 px-8 py-3"
              onPress={handleRetry}>
              <Text className="text-base font-semibold text-white">Retry</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    );
  }

  // Loading states
  const isSeeding = success && seedingState === 'loading';

  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <Animated.View style={{ opacity: fadeAnim }} className="items-center px-10">
          <Animated.View style={{ transform: [{ scale: pulseAnim }] }} className="mb-8">
            <Text className="text-center text-8xl">🎵</Text>
          </Animated.View>

          <Text className="mb-3 text-center text-3xl font-bold text-white">
            {isSeeding ? 'Setting up Songs' : 'Preparing Database'}
          </Text>

          <Text className="mb-10 text-center text-base leading-6 text-white/80">
            {isSeeding ? 'Loading your song collection...' : 'Migrating database schema...'}
          </Text>

          <View className="mb-8 items-center">
            <View
              className="mb-3 rounded-full bg-white/30"
              style={{ width: width - 80, height: 6 }}>
              <Animated.View
                className="h-full rounded-full bg-white"
                style={{
                  width: isSeeding ? '85%' : '45%',
                }}
              />
            </View>
            <Text className="text-sm font-semibold text-white">{isSeeding ? '85%' : '45%'}</Text>
          </View>

          <View className="flex-row items-center">
            <View className="mr-2 h-2 w-2 rounded-full bg-white/80" />
            <Text className="text-sm text-white/80">
              {isSeeding ? 'Seeding songs and choruses' : 'Running migrations'}
            </Text>
          </View>
        </Animated.View>
      </View>
    </View>
  );
}
