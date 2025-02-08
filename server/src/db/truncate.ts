import { sql } from "drizzle-orm";
import db from ".";
import env from "../config/env";

const main = async () => {
  if (env.NODE_ENV !== "development") {
    console.error("This script is only for development environment.");
    process.exit(1);
  }
  const table = process.argv[2];
  if (!table) {
    console.error("Table name is required.");
    process.exit(1);
  }

  try {
    await db.execute(sql.raw(`TRUNCATE TABLE ${table}`));
    console.log(`Truncated table ${table}`);
    process.exit(0);
  } catch (error) {
    console.error("Error on truncating table: ", error);
    process.exit(1);
  }
};

main();
