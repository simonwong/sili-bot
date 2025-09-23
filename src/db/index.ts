import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import { chat, messages } from './schema';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const schema = { chat, messages };
const client = postgres(connectionString);
export const db = drizzle({ client, schema });
