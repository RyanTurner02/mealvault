import { mysqlTable, index, primaryKey, int, varchar, datetime, unique } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const recipe = mysqlTable("recipe", {
	recipeId: int("recipe_id").autoincrement().notNull(),
	userId: int("user_id").notNull().references(() => user.userId),
	recipeName: varchar("recipe_name", { length: 255 }).notNull(),
	prepTime: varchar("prep_time", { length: 255 }).notNull(),
	cookTime: varchar("cook_time", { length: 255 }).notNull(),
	servings: varchar("servings", { length: 255 }).notNull(),
	ingredients: varchar("ingredients", { length: 2000 }).notNull(),
	instructions: varchar("instructions", { length: 2000 }).notNull(),
	externalLink: varchar("external_link", { length: 255 }),
	dateCreated: datetime("date_created", { mode: 'string'}).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	dateUpdated: datetime("date_updated", { mode: 'string'}).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	dateDeleted: datetime("date_deleted", { mode: 'string'}),
},
(table) => [
	index("user_id").on(table.userId),
	primaryKey({ columns: [table.recipeId], name: "recipe_recipe_id"}),
]);

export const user = mysqlTable("user", {
	userId: int("user_id").autoincrement().notNull(),
	userName: varchar("user_name", { length: 255 }).notNull(),
	userPassword: varchar("user_password", { length: 255 }).notNull(),
	userEmail: varchar("user_email", { length: 255 }).notNull().default(""),
	dateCreated: datetime("date_created", { mode: 'string'}).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	dateUpdated: datetime("date_updated", { mode: 'string'}).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	dateDeleted: datetime("date_deleted", { mode: 'string'}),
},
(table) => [
	primaryKey({ columns: [table.userId], name: "user_user_id"}),
	unique("user_email").on(table.userEmail),
]);
