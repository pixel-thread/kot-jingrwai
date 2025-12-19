import React, { lazy, useEffect, useState } from 'react';

import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { logger } from '~/src/utils/logger';
import { LoadingScreen } from '../../Common/Loading';
import { Migrations } from '.';

type Props = {
  children: React.ReactNode;
};
export const InitializeDatabase = ({ children }: Props) => {
  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    const ensureBundledDbInstalled = async () => {
      try {
        logger.info('Ensuring bundled db is installed');
        const DB_NAME = 'kot-jingrwai.db';
        const SQLITE_DIR = FileSystem.documentDirectory + 'SQLite/';
        const DB_PATH = SQLITE_DIR + DB_NAME;
        const info = await FileSystem.getInfoAsync(DB_PATH);
        logger.info('DB_PATH', info.exists);
        if (!info.exists) {
          logger.info('Installing bundled db');
          await FileSystem.makeDirectoryAsync(SQLITE_DIR, { intermediates: true });
          const asset = Asset.fromModule(require('~/assets/db/kot-jingrwai.db'));
          await asset.downloadAsync();
          if (!asset.localUri) throw new Error('Database asset not available');
          await FileSystem.copyAsync({ from: asset.localUri, to: DB_PATH });
          console.log('Copied DB from', asset.localUri, DB_PATH);
        } else {
          logger.info('Bundled db already installed');
        }
      } catch (e) {
        logger.error(e);
        setDbReady(true);
      } finally {
        setDbReady(true);
      }
    };
    ensureBundledDbInstalled();
  }, []);

  if (!dbReady) return <LoadingScreen />;

  return <Migrations>{children}</Migrations>;
};
