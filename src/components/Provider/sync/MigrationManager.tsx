import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { db } from '~/src/libs/db/drizzle';
import migrations from '~/src/libs/db/drizzle/migrations/migrations';
import React, { useEffect } from 'react';
import { useBannerStore } from '~/src/libs/stores/banner/useBannerStore';

type Props = {
  children: React.ReactNode;
};

export default function MigrationManager({ children }: Props) {
  const { success, error } = useMigrations(db, migrations);
  const { setBanner } = useBannerStore();

  useEffect(() => {
    setBanner({
      variant: 'info',
      message: 'Sync: Checking',
      visible: true,
    });
    if (error) {
      setBanner({
        variant: 'error',
        message: 'Sync: Error',
        visible: true,
      });
    }
    if (!success) {
      setBanner({
        variant: 'warning',
        message: 'Sync: Pending',
        visible: true,
      });
    }

    setBanner({
      variant: 'success',
      message: 'Sync: Success',
      visible: true,
    });
  }, [error, success, setBanner]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setBanner({
          variant: 'info',
          message: '',
          visible: false,
        });
      }, 2000);
    }
  }, [success]);

  return <>{children}</>;
}
