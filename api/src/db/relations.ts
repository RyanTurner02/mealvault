import { relations } from "drizzle-orm/relations";
import { recipe, user } from "./schema";

export const recipeRelations = relations(recipe, ({one, many}) => ({
	user: one(user, {
		fields: [recipe.userId],
		references: [user.userId]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	recipes: many(recipe),
}));