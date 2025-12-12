// db/client.ts
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { openDatabaseSync } from 'expo-sqlite';
import * as schema from '~/src/libs/db/drizzle/schema';

export const expoDb = openDatabaseSync('kot-jingrwai.db');

export const db = drizzle(expoDb, { schema });
