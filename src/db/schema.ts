import {
  pgTable,
  varchar,
  uuid,
  text,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password"),

  // Other user Related Fields (role,)

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

// export const accountsTable = pgTable("accounts", {});

export const userPreferences = pgTable("user_preferences", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => usersTable.id),
  // User Preferences Columns
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
