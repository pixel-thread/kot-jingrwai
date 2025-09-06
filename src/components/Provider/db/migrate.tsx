import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { Text } from 'react-native';
import migrations from '~/src/db/drizzle/migrations/migrations';
import { db } from '~/src/db/drizzle';
import { useEffect } from 'react';
import { seedSongs } from '~/src/db/drizzle/seeder';
import { logger } from '~/src/utils/logger';

type Props = {
  children: React.ReactNode;
};
export function DBMigrationGate({ children }: Props) {
  const { success, error } = useMigrations(db, migrations);

  useEffect(() => {
    if (success) {
      logger.log('Migrate Successfully=>Seeding');
      seedSongs();
    }
  }, [success]);

  if (error) {
    logger.error({ message: error });
    return <Text>Migration error: {error.message}</Text>;
  }
  if (!success) {
    return <Text>Migration is in progress...</Text>;
  }

  return children;
}
