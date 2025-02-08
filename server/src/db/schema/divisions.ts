import { relations } from "drizzle-orm";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { districtTable } from "./districts";

export const divisionTable = pgTable("divisions", {
  name: varchar("name", { length: 50 }).primaryKey(),
  startingPostalCode: integer("starting_postal_code").notNull(),
  endingPostalCode: integer("ending_postal_code").notNull(),
});

export const divisionRelationsTable = relations(divisionTable, ({ many }) => ({
  districts: many(districtTable),
}));
