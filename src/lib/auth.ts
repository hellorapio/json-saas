import { db } from "@/db";
import {
  accountsTable,
  usersTable,
  verificationTokensTable,
} from "@/db/schema";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: usersTable,
    accountsTable: accountsTable,
    verificationTokensTable: verificationTokensTable,
  }),
  providers: [
    Github,
    //  Google
  ],
});
