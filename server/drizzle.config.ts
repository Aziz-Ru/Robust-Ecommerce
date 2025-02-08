import { defineConfig } from "drizzle-kit";
import env from "./src/config/env";

export default defineConfig({
  out: "./src/db/migrations",
  schema: "./src/db/schema/",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DB_URL,
  },
  verbose: true,
  strict: true,
});
