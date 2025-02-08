import { relations } from "drizzle-orm";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { divisionTable } from "./divisions";

export const districtTable = pgTable("districts", {
  name: varchar("name", { length: 50 }).primaryKey(),
  division: varchar("division").references(() => divisionTable.name),
  startingPostalCode: integer("starting_postal_code").notNull(),
});

export const districtRelations = relations(districtTable, ({ one }) => ({
  division: one(divisionTable, {
    fields: [districtTable.division],
    references: [divisionTable.name],
  }),
}));
