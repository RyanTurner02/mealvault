import { relations } from "drizzle-orm/relations";
import { recipe, customField, instruction, user } from "./schema";

export const customFieldRelations = relations(customField, ({one}) => ({
	recipe: one(recipe, {
		fields: [customField.recipeId],
		references: [recipe.recipeId]
	}),
}));

export const recipeRelations = relations(recipe, ({one, many}) => ({
	customFields: many(customField),
	instructions: many(instruction),
	user: one(user, {
		fields: [recipe.userId],
		references: [user.userId]
	}),
}));

export const instructionRelations = relations(instruction, ({one}) => ({
	recipe: one(recipe, {
		fields: [instruction.recipeId],
		references: [recipe.recipeId]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	recipes: many(recipe),
}));