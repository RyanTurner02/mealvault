import { mysqlTable, mysqlSchema, AnyMySqlColumn, index, foreignKey, primaryKey, int, varchar, text, datetime, unique } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const customField = mysqlTable("custom_field", {
	fieldId: int("field_id").autoincrement().notNull(),
	recipeId: int("recipe_id").notNull().references(() => recipe.recipeId),
	fieldName: varchar("field_name", { length: 255 }),
	fieldType: int("field_type"),
	fieldText: text("field_text"),
	dateCreated: datetime("date_created", { mode: 'string'}).default(sql`(CURRENT_TIMESTAMP)`),
	dateUpdated: datetime("date_updated", { mode: 'string'}).default(sql`(CURRENT_TIMESTAMP)`),
	dateDeleted: datetime("date_deleted", { mode: 'string'}),
},
(table) => [
	index("recipe_id").on(table.recipeId),
	primaryKey({ columns: [table.fieldId], name: "custom_field_field_id"}),
]);

export const instruction = mysqlTable("instruction", {
	instructionId: int("instruction_id").autoincrement().notNull(),
	recipeId: int("recipe_id").notNull().references(() => recipe.recipeId),
	instructionText: text("instruction_text"),
	dateCreated: datetime("date_created", { mode: 'string'}).default(sql`(CURRENT_TIMESTAMP)`),
	dateUpdated: datetime("date_updated", { mode: 'string'}).default(sql`(CURRENT_TIMESTAMP)`),
	dateDeleted: datetime("date_deleted", { mode: 'string'}),
},
(table) => [
	index("recipe_id").on(table.recipeId),
	primaryKey({ columns: [table.instructionId], name: "instruction_instruction_id"}),
]);

export const recipe = mysqlTable("recipe", {
	recipeId: int("recipe_id").autoincrement().notNull(),
	userId: int("user_id").notNull().references(() => user.userId),
	recipeName: varchar("recipe_name", { length: 255 }).notNull(),
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
