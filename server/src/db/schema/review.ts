import { relations } from "drizzle-orm";
import { decimal, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { productTable } from "./product";

export const reviewTable = pgTable("review", {
  id: uuid("id").primaryKey().defaultRandom(),
  productId: uuid("product_id")
    .references(() => productTable.id)
    .notNull(),
  userId: uuid("user_id").notNull(),
  review: text("review").notNull(),
  rating: decimal("rating", { precision: 2, scale: 1 }).notNull(),
  createdAt: timestamp("created_at", { precision: 6, withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const reviewProductRelationTable = relations(reviewTable, ({ one }) => {
  return {
    product: one(productTable, {
      fields: [reviewTable.productId],
      references: [productTable.id],
    }),
  };
});
