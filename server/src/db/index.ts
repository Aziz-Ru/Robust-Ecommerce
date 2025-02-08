import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import env from "../config/env";
import * as schema from "./schema";

const pool = new Pool({
  connectionString: env.DB_URL,
});
const db = drizzle({ client: pool, schema: schema });

export default db;
