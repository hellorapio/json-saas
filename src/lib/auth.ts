import bcrypt from "bcryptjs";
import { db } from "@/db";
import {
  accountsTable,
  usersTable,
  verificationTokensTable,
} from "@/db/schema";

import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { loginSchema } from "@/lib/zod";
import { getUserByEmail, updateUserById } from "@/db/repositories/user";

import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import NextAuth, { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      role: string;
    } & DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: usersTable,
    accountsTable: accountsTable,
    verificationTokensTable: verificationTokensTable,
  }),

  pages: {
    signIn: "/login",
    error: "/error",
  },

  events: {
    linkAccount: async ({ user }) => {
      if (user.id)
        await updateUserById(user.id, {
          emailVerified: new Date(),
        });
    },
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        //@ts-ignore
        token.role = user.role;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user && token.role) {
        session.user.role = token.role as string;
      }
      return session;
    },

    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      // The user should be able to login 
      // and resend verification from the settings
      // //@ts-ignore
      // if (!user.emailVerified) return false;

      return true;
    },
  },
  useSecureCookies: process.env.NODE_ENV === "production",
  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },
  providers: [
    Github,
    Google,
    Credentials({
      async authorize(credentials) {
        const validated = await loginSchema.safeParseAsync(credentials);
        if (!validated.success) return null;

        const { email, password } = validated.data;

        const user = await getUserByEmail(email);
        if (!user || !user.password) return null;

        if (await bcrypt.compare(password, user.password)) return user;

        return null;
      },
    }),
  ],
});
