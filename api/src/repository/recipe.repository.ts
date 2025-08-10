import { recipe } from "@db/schema";
import { RecipeDto } from "@dtos/recipe.dto";
import { and, eq, sql } from "drizzle-orm";
import { MySql2Database, MySqlRawQueryResult } from "drizzle-orm/mysql2";

interface IRecipeRepositoryDependencies {
    db: MySql2Database<Record<string, never>>;
};

export interface IRecipeRepository {
    createRecipe(userId: number, recipeDto: RecipeDto): Promise<number | null>;
    getAllRecipes(userId: number): Promise<any>;
    getRecipe(userId: number, recipeId: number): Promise<RecipeDto | null>;
    searchRecipes(userId: number, keywords: string): Promise<any>;
    deleteRecipe(userId: number, recipeId: number): Promise<number>;
    updateRecipe(userId: number, recipeId: number, recipeDto: RecipeDto): Promise<number>;
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

        return result[0];
    }

    const searchRecipes = async (userId: number, keywords: string): Promise<any> => {
        const result = await db.execute(
            sql`SELECT *
            FROM ${recipe}
            WHERE user_id = ${userId}
            AND MATCH (recipe_name, ingredients, instructions)
                AGAINST (${keywords})`
        );

        return result[0];
    }

    const deleteRecipe = async (userId: number, recipeId: number): Promise<any> => {
        const result = await db
            .delete(recipe)
            .where(
                and(
                    eq(recipe.userId, userId),
                    eq(recipe.recipeId, recipeId)
                )
            )

        return result[0].affectedRows;
    }

    const updateRecipe = async (userId: number, recipeId: number, recipeDto: RecipeDto): Promise<number> => {
        const result = await db
            .update(recipe)
            .set({
                recipeName: recipeDto.name,
                prepTime: recipeDto.prepTime,
                cookTime: recipeDto.cookTime,
                servings: recipeDto.servings,
                ingredients: recipeDto.ingredients,
                instructions: recipeDto.instructions,
                externalLink: recipeDto?.externalLink
            })
            .where(
                and(
                    eq(recipe.userId, userId),
                    eq(recipe.recipeId, recipeId),
                )
            );

        return result[0].affectedRows;
    }

    return {
        createRecipe,
        getAllRecipes,
        getRecipe,
        searchRecipes,
        deleteRecipe,
        updateRecipe,
    };
}