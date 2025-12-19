import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from '~/src/libs/db/drizzle/migrations/migrations';
import { db } from '~/src/libs/db/drizzle';
import { Banner } from '../../Common/Banner';
import { useEffect, useMemo, useState } from 'react';
import { logger } from '~/src/utils/logger';

type Props = { children: React.ReactNode };

type Status = 'Migrating' | 'Migrated' | 'Failed';

export const Migrations = ({ children }: Props) => {
  const { success, error } = useMigrations(db, migrations);

  const status: Status = useMemo(() => {
    if (error) {
      logger.error(error, {
        timestamp: Date.now(),
      });
      return 'Failed';
    }
    if (success) {
      logger.info('Database migrated', {
        timestamp: Date.now(),
      });
      return 'Migrated';
    }
    return 'Migrating';
  }, [success, error]);

  const [isShown, setIsShown] = useState(true);

  useEffect(() => {
    if (status === 'Migrated') {
      const timeout = setTimeout(() => {
        setIsShown(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }

    // Always show banner for migrating or failed
    setIsShown(true);
  }, [status]);

  return (
    <>
      <Banner isShown={isShown} message={`Database: ${status}`} />
      {children}
    </>
  );
};
