import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const snippets = sqliteTable("snippets", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  code: text("code").notNull(),
  category: text("category").notNull(),
  // tags: text("tags").default("[]"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export type Snippet = typeof snippets.$inferSelect;
export type InsertSnippet = typeof snippets.$inferInsert;
