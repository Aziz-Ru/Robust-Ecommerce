import { relations } from "drizzle-orm";
import {
  boolean,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { addressTable } from "./address";

export const userTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  phone: varchar("phone", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  phoneVerified: boolean("phone_verified").default(false),
  confirmationCode: varchar("confirmation_code", { length: 255 }).notNull(),
  confirmationCodeSentAt: timestamp("confirmation_code_sent_at", {
    precision: 6,
    withTimezone: true,
  }).notNull(),
  confirmedAt: timestamp("confirmed_at", { precision: 6, withTimezone: true }),
  isActivated: boolean("is_activated").default(false),
  platform: varchar("platform", {
    enum: ["WEB", "ANDROID", "IOS"],
  }).default("WEB"),
  lastSignedInAt: timestamp("last_signed_in_at"),
  createdAt: timestamp("created_at", { precision: 6, withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const userProfile = relations(userTable, ({ many }) => ({
  address: many(addressTable),
}));
