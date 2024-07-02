import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@/db/schema";

export const connection = neon(process.env.PG_URL!);
export const db = drizzle(connection, { schema });
