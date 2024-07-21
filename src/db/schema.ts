import { relations } from "drizzle-orm";
import {
  pgTable,
  varchar,
  uuid,
  text,
  unique,
  integer,
  boolean,
  timestamp,
  pgEnum,
  primaryKey,
} from "drizzle-orm/pg-core";
import { AdapterAccountType } from "next-auth/adapters";

export const verificationEnum = pgEnum("verification_types", [
  "Email-Verification",
  "Password-Reset",
]);

export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  password: text("password"),
  image: text("image"),
  role: text("role").default("user"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const accountsTable = pgTable(
  "user_accounts",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.userId],
    }),
  })
);

export const verificationTokensTable = pgTable(
  "verification_tokens",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
    tokenType: verificationEnum("token_type").notNull(),
  },
  (verificationToken) => ({
    uniqueIdx: unique().on(
      verificationToken.tokenType,
      verificationToken.identifier
    ),
  })
);

export const userRelations = relations(usersTable, ({ one, many }) => ({
  userPreferences: one(userPreferencesTable),
  qouta: one(qoutasTable),
  api: one(apisTable),
  invoices: many(invoicesTable),
  accounts: many(accountsTable),
  generationsHistory: many(generationsHistoryTable),
}));

export const userPreferencesTable = pgTable("user_preferences", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => usersTable.id)
    .notNull(),
  emailNotifications: boolean("email_notifications")
    .notNull()
    .default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const apisTable = pgTable("apis", {
  id: uuid("id").primaryKey().defaultRandom(),
  apiKey: text("api_key").notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),

  // Other api related Fields

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const qoutasTable = pgTable("qoutas", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id),
  credits: integer("credits").default(10),
});

export const invoicesTable = pgTable("invoices", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => usersTable.id)
    .notNull(),
  amountDue: integer("amount_due").notNull(),
  credits: integer("credits").notNull(),
  status: varchar("status", { length: 20 }).default("unpaid"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const generationsHistoryTable = pgTable("generations_history", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => usersTable.id)
    .notNull(),
  data: text("data"),
  format: text("format"),
  response: text("response").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
