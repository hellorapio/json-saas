import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
// import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@/db/schema";
// import { Client } from "pg";

// export const connection = new Client({
//   connectionString: process.env.PG_URL!,
// });

// async function main() {
//   await connection.connect();
// }
// main();

export const connection = neon(process.env.PG_URL!);
export const db = drizzle(connection, { schema });
