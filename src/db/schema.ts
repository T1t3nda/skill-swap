import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  boolean,
  json,
  uuid,
} from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").unique().notNull(),
  name: text("name").notNull(),
  image: text("image"),
  githubUsername: text("github_username"),
  bio: text("bio"),
  reputation: integer("reputation").default(0),
  level: integer("level").default(1),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})
