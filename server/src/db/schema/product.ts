import { relations } from "drizzle-orm";
import {
  boolean,
  decimal,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { categoryTable } from "./category";
import { reviewTable } from "./review";

// products table
export const productTable = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),

  //pricing
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  salePrice: decimal("sale_price").notNull(),
  costPrice: decimal("cost_price").notNull(),

  // inventory
  stockQuantity: integer("stock_quantity").notNull(),
  lowStockThershold: integer("low_stock_thershold").notNull().default(5),

  //product details
  sku: varchar("sku", { length: 55 }).notNull().unique(),
  manufacturer: varchar("manufacturer", { length: 255 }).notNull(),
  barcode: varchar("barcode", { length: 255 }),
  //   brandId: uuid("brand_id").references(() => brands.id),
  // physical attributes
  weight: decimal("weight", { precision: 8, scale: 2 }),
  color: varchar("color", { length: 100 }),
  dimension: varchar("dimension", { length: 100 }),
  //flags and status
  isActive: boolean("is_active").default(true),
  isFeatured: boolean("is_featured").default(false),
  isBackOrderAllowed: boolean("is_back_order_allowed").default(false),
  isFreeShipping: boolean("is_free_shipping").default(false),
  // metrics
  avgRating: decimal("avg_rating", { precision: 2, scale: 1 }).default("0.0"),
  totalViews: integer("total_views").default(0),
  totalSold: integer("total_sold").default(0),
  // seo
  tags: text("tags"),
  metaTitle: varchar("meta_title", { length: 255 }),
  metaDescription: text("meta_description"),
  createdAt: timestamp("created_at", { precision: 6, withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const productImageTable = pgTable("product_images", {
  id: uuid("id").primaryKey().defaultRandom(),
  productId: uuid("product_id").references(() => productTable.id),
  imageUrl: varchar("image_url", { length: 511 }).notNull(),
  altText: varchar("alt_text", { length: 255 }).default("alt_text"),
  isPrimary: boolean("is_primary").default(false),
});

export const productSizesTable = pgTable("product_sizes", {
  id: uuid("id").primaryKey().defaultRandom(),
  productId: uuid("product_id").references(() => productTable.id),
  size: varchar("size", {
    enum: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
  }).notNull(),
  isAvailable: boolean("is_available").default(true),
});

export const productRelationsTable = relations(productTable, ({ many }) => {
  return {
    category: many(categoryTable),
    images: many(productImageTable),
    reviews: many(reviewTable),
  };
});

export const productImageRelationTable = relations(
  productImageTable,
  ({ one }) => {
    return {
      product: one(productTable, {
        fields: [productImageTable.productId],
        references: [productTable.id],
      }),
    };
  }
);
