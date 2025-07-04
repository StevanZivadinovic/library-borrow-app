import { defineConfig } from 'drizzle-kit';
import config from './config';
export default defineConfig({
  out: './migrations',
  schema: './database/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: config.env.databaseUrl,
  },
});
// This configuration file is used to generate the database schema using Drizzle ORM.






