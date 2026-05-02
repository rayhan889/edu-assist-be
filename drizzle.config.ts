import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/models',
  out: './src/db/migrations',
  dialect: 'postgresql',
  strict: true,
  verbose: true,
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
});
