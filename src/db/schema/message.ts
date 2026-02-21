import type { UIDataTypes, UIMessagePart, UITools } from 'ai';
import { json, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { chat } from './chat';

export const messages = pgTable('message', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  chatId: uuid('chatId')
    .notNull()
    .references(() => chat.id, { onDelete: 'cascade' }),
  role: varchar('role', { length: 20 }).notNull(),
  parts: json('parts').notNull().$type<UIMessagePart<UIDataTypes, UITools>[]>(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type Message = typeof messages.$inferSelect;
export type NewMessage = typeof messages.$inferInsert;
