import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const chat = pgTable('chat', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  userId: text('user_id').notNull(),
  modelId: text('model_id'),
  systemPrompt: text('system_prompt'),
  lastActivity: timestamp('last_activity').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type Chat = typeof chat.$inferSelect;
export type NewChat = typeof chat.$inferInsert;
