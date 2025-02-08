import { sql } from "drizzle-orm";
import db from "../../db";

export const queryTables = async () => {
  const tables = await db.execute(
    `SELECT table_name FROM information_schema.tables where table_schema = 'public' ORDER BY table_name`
  );
  return tables.rows;
};

export const queryColumns = async (table: string) => {
  const columns = await db.execute(
    sql`SELECT column_name FROM information_schema.columns WHERE table_name = ${table}`
  );
  return columns.rows;
};
