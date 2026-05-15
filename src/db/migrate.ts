import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Client } from 'pg';
import 'dotenv/config';

async function runMigration() {
  const client = new Client({ connectionString: process.env.POSTGRES_URL });
  await client.connect();
  const db = drizzle(client);

  try {
    console.log('Running migrations...');
    await migrate(db, { migrationsFolder: './src/db/migrations' });
    console.log('Migrations complete!');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

runMigration();
