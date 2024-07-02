import { config } from "dotenv";
config({ path: "./.env.local" });
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/neon-http/migrator";
import * as schema from "./schema";

(async function () {
  const connection = neon(process.env.PG_URL!);
  const db = drizzle(connection, { schema });
  await migrate(db, { migrationsFolder: "./src/db/drizzle" });
  console.log("Migration Done");
})();
