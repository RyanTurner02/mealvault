import { RecipeDto } from "@dtos/recipe.dto";
import { MySql2Database } from "drizzle-orm/mysql2";

interface IRecipeRepositoryDependencies {
    db: MySql2Database<Record<string, never>>;
};

export interface IRecipeRepository {
    createRecipe(recipeDto: RecipeDto): boolean;
};

export const createRecipeRepository = ({ db }: IRecipeRepositoryDependencies): IRecipeRepository => {
    const createRecipe = (recipeDto: RecipeDto): boolean => {
        return true;
    }
    
    return {
        createRecipe
    };
}