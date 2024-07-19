import { randomBytes, createHash } from "crypto";
import { verificationTokensTable } from "./../schema";
import { eq, and, gt } from "drizzle-orm";
import { db } from "..";
import { updateUserByEmail } from "./user";

type NewToken = typeof verificationTokensTable.$inferInsert;
type TokenType = "Email-Verification" | "Password-Reset";

export async function verifyEmail(token: string) {
  const dbToken = await findTokenByTokenAndType(
    token,
    "Email-Verification"
  );

  if (dbToken.length === 0) return false;

  console.log(
    await deleteToken(dbToken[0].identifier, dbToken[0].tokenType)
  );
  await updateUserByEmail(dbToken[0].identifier, {
    emailVerified: new Date(),
  });

  return true;
}

export async function deleteToken(identifier: string, type: TokenType) {
  return await db
    .delete(verificationTokensTable)
    .where(
      and(
        eq(verificationTokensTable.identifier, identifier),
        eq(verificationTokensTable.tokenType, type)
      )
    )
    .returning();
}

export async function findTokenByEmailAndType(
  email: string,
  tokenType: TokenType
) {
  return db
    .select()
    .from(verificationTokensTable)
    .where(
      and(
        eq(verificationTokensTable.identifier, email),
        eq(verificationTokensTable.tokenType, tokenType)
      )
    );
}

export async function findTokenByTokenAndType(
  token: string,
  tokenType: TokenType,
  trx = db
) {
  return trx
    .select()
    .from(verificationTokensTable)
    .where(
      and(
        eq(verificationTokensTable.token, await hashToken(token)),
        eq(verificationTokensTable.tokenType, tokenType),
        gt(verificationTokensTable.expires, new Date())
      )
    );
}

export async function generateToken() {
  return randomBytes(32).toString("hex");
}

export async function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function createToken(
  identifier: string,
  tokenType: "Email-Verification" | "Password-Reset"
) {
  const expires = new Date(Date.now() + 3600 * 1000);
  const token = await generateToken();
  const hash = await hashToken(token);

  if (await findTokenByEmailAndType(identifier, tokenType))
    await deleteToken(identifier, tokenType);

  await db
    .insert(verificationTokensTable)
    .values({ identifier, tokenType, expires, token: hash });

  return token;
}
