import { recipe } from "@db/schema";
import { RecipeDto } from "@dtos/recipe.dto";
import { and, eq } from "drizzle-orm";
import { MySql2Database, MySqlRawQueryResult } from "drizzle-orm/mysql2";

interface IRecipeRepositoryDependencies {
    db: MySql2Database<Record<string, never>>;
};

export interface IRecipeRepository {
    createRecipe(userId: number, recipeDto: RecipeDto): Promise<number | null>;
    getAllRecipes(userId: number): Promise<any>;
    getRecipe(userId: number, recipeId: number): Promise<RecipeDto | null>;
};

export const createRecipeRepository = ({ db }: IRecipeRepositoryDependencies): IRecipeRepository => {
    const createRecipe = async (userId: number, recipeDto: RecipeDto): Promise<number | null> => {
        const result: MySqlRawQueryResult = await db.insert(recipe).values({
            userId: userId,
            recipeName: recipeDto.name,
            prepTime: recipeDto.prepTime,
            cookTime: recipeDto.cookTime,
            servings: recipeDto.servings,
            ingredients: recipeDto.ingredients,
            instructions: recipeDto.instructions,
            externalLink: recipeDto?.externalLink
        });

        if (!result?.length) {
            return null;
        }
        return result[0].insertId;
    }

    const getAllRecipes = async (userId: number): Promise<any> => {
        const result = await db
            .select()
            .from(recipe)
            .where(
                eq(recipe.userId, userId)
            );

        return result;
    }

    const getRecipe = async (userId: number, recipeId: number): Promise<any> => {
        const result = await db
            .select()
            .from(recipe)
            .where(
                and(
                    eq(recipe.userId, userId),
                    eq(recipe.recipeId, recipeId)
                ));

        return result;
    }

    return {
        createRecipe,
        getAllRecipes,
        getRecipe,
    };
}