import { relations } from "drizzle-orm";
import {
  decimal,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { productTable } from "./product";

export const categoryTable = pgTable("category", {
  slug: varchar("slug", { length: 255 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  description: text("description"),
  iconUrl: varchar("image_url", { length: 512 }),
  avgRating: decimal("avg_rating", { precision: 2, scale: 1 }).default("0.0"),
  metaTitle: varchar("meta_title", { length: 255 }),
  metaDescription: text("meta_description"),
  createdAt: timestamp("created_at", { precision: 6, withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const categoryProductTable = pgTable(
  "category_product",
  {
    categoryId: varchar("category_id")
      .references(() => categoryTable.slug)
      .notNull(),
    productId: uuid("product_id")
      .references(() => productTable.id)
      .notNull(),
  },
  (table) => [
    {
      pk: primaryKey({
        name: "product_category_pk",
        columns: [table.categoryId, table.productId],
      }),
    },
  ]
);

export const categoryProductRelationTable = relations(
  categoryTable,
  ({ many }) => {
    return {
      products: many(productTable),
    };
  }
);
