import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function createUser(body: typeof usersTable.$inferInsert) {
  const user = await db.insert(usersTable).values(body);
}

export async function getUserByEmail(email: string) {
  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.email, email),
  });

  return user;
}

export async function updateUserById(
  id: string,
  data: Record<string, any>
) {
  await db.update(usersTable).set(data).where(eq(usersTable.id, id));
}
