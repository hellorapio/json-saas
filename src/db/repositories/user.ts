import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";

type NewUser = Partial<typeof usersTable.$inferInsert>;
type User = typeof usersTable.$inferSelect;

export async function createUser(body: typeof usersTable.$inferInsert) {
  await db.insert(usersTable).values(body);
}

export async function getUserByEmail(email: string) {
  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.email, email),
  });

  return user;
}

export async function updateUserById(id: string, data: NewUser) {
  await db.update(usersTable).set(data).where(eq(usersTable.id, id));
}

export async function updateUserByEmail(email: string, data: NewUser) {
  await db.update(usersTable).set(data).where(eq(usersTable.email, email));
}
