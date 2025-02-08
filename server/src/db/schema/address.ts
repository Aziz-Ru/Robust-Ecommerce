import { integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

import { districtTable } from "./districts";
import { divisionTable } from "./divisions";
import { userTable } from "./user";

export const addressTable = pgTable("address", {
  id: uuid("id").primaryKey().defaultRandom(),
  streetAddress1: varchar("street_address_1", { length: 255 }).notNull(),
  streetAddress2: varchar("street_address_2", { length: 255 }),
  postalCode: integer("postal_code").notNull(),
  district: varchar("city").references(() => districtTable.name),
  division: varchar("division").references(() => divisionTable.name),
  userId: uuid("user_id").references(() => userTable.id),
});
