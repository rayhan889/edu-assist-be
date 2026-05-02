import { pgTable, uuid, varchar, text, timestamp, integer, jsonb } from 'drizzle-orm/pg-core';

import { users } from './users';
export const documents = pgTable('documents', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  fileName: varchar('file_name', { length: 255 }).notNull(),
  originalPath: varchar('original_path', { length: 512 }).notNull(), // S3 path to original
  markdownContent: text('markdown_content'), // Converted markdown
  mimeType: varchar('mime_type', { length: 100 }).notNull(),
  fileSize: integer('file_size').notNull(), // bytes
  metadata: jsonb('metadata').$type<Record<string, unknown>>(),
  status: varchar('status', { length: 20 }).default('processing').notNull(), // processing | ready | failed
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
