import { config } from "dotenv";
config({ path: ".env.local" });
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./src/db/drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.PG_URL!,
  },
  verbose: true,
  strict: true,
});
