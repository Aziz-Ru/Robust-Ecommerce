import {
  decimal,
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { productTable } from "./product";

export const cartTable = pgTable("cart", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: varchar("user_id").notNull(),
  status: varchar("status", {
    length: 50,
    enum: ["active", "converted", "abandoned"],
  }).default("active"),
  createdAt: timestamp("created_at", { precision: 6, withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const cartItemsTable = pgTable("cart_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  cartId: uuid("cart_id")
    .references(() => cartTable.id)
    .notNull(),
  productId: uuid("product_id")
    .references(() => productTable.id)
    .notNull(),
  quantity: integer("quantity").notNull(),
  price: decimal("price").notNull(),
});
