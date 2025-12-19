import React, { lazy, useEffect, useState } from 'react';

import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { logger } from '~/src/utils/logger';
import { ActivityIndicator } from 'react-native';
import { LoadingScreen } from '../../Common/Loading';

const Migrations = lazy(() =>
  import('~/src/components/Provider/migrations').then((mod) => ({ default: mod.Migrations }))
);

type Props = {
  children: React.ReactNode;
};
export const InitializeDatabase = ({ children }: Props) => {
  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    const ensureBundledDbInstalled = async () => {
      try {
        const DB_NAME = 'kot-jingrwai.db';
        const SQLITE_DIR = FileSystem.documentDirectory + 'SQLite/';
        const DB_PATH = SQLITE_DIR + DB_NAME;
        const info = await FileSystem.getInfoAsync(DB_PATH);
        if (!info.exists) {
          await FileSystem.makeDirectoryAsync(SQLITE_DIR, { intermediates: true });
          const asset = Asset.fromModule(require('~/assets/db/kot-jingrwai.db'));
          await asset.downloadAsync();
          if (!asset.localUri) throw new Error('Database asset not available');
          await FileSystem.copyAsync({ from: asset.localUri, to: DB_PATH });
          console.log('Copied DB from', asset.localUri, DB_PATH);
        }
        setDbReady(true);
      } catch (e) {
        logger.error(e);
        setDbReady(true);
      }
    };
    ensureBundledDbInstalled();
  }, []);

  if (!dbReady) return <LoadingScreen />;

  return <Migrations>{children}</Migrations>;
};
