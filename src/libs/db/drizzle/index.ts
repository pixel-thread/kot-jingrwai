import * as SQLite from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import * as schema from './schema';

const DATABASE_NAME = 'kot-jingrwai.db';

const expo = SQLite.openDatabaseSync(DATABASE_NAME);
console.log('🚀 ~ expo', expo.databasePath);

export const db = drizzle(expo, { schema });
