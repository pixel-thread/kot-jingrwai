import { Container } from '../Common/Container';
import { Text } from '../ui/typography';
import { View, StyleSheet } from 'react-native';
import { useColorScheme } from 'nativewind';
import colors from 'tailwindcss/colors';
import { FontAwesome } from '@expo/vector-icons';

export const NotFoundSong = () => {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <Container className="h-full">
      <View
        style={[
          styles.content,
          {
            shadowColor: isDarkMode ? colors.gray[700] : colors.gray[300],
          },
        ]}>
        <FontAwesome
          name="music"
          size={48}
          color={isDarkMode ? colors.gray[400] : colors.gray[500]}
          style={styles.icon}
        />
        <Text size={'3xl'} weight={'bold'} variant={'default'}>
          Song Not Found
        </Text>
        <Text size={'lg'} align={'center'} variant={'secondary'}>
          We couldn&apos;t find the song you&apos;re looking for. Try searching again or return to
          the home page.
        </Text>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    borderRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  icon: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
});
