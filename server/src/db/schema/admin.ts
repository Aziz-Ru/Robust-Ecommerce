import { pgTable, serial, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const roleTable = pgTable("role", {
  id: serial("id").primaryKey(),
  name: varchar("name", {
    length: 10,
  }),
});

export const adminTable = pgTable("admin", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: serial("role")
    .notNull()
    .references(() => roleTable.id),
  lastSignedInAt: timestamp("last_signed_in_at", {
    precision: 6,
    withTimezone: true,
  }),
  
  createdAt: timestamp("created_at", {
    precision: 6,
    withTimezone: true,
  }).defaultNow(),
  updatedAt: timestamp("updated_at", {
    precision: 6,
    withTimezone: true,
  }).defaultNow(),
});

export const permissionTable = pgTable("permission", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", {
    length: 10,
  }),
});

export const rolePermissionTable = pgTable("role_permission", {
  roleId: serial("role_id").references(() => roleTable.id),
  permissionId: uuid("permission_id").references(() => permissionTable.id),
});
