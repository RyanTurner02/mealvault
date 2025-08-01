import { RecipeDto } from "@dtos/recipe.dto";
import { IRecipeRepository } from "@repository/recipe.repository";

interface IRecipeServiceDependencies {
    recipeRepository: IRecipeRepository;
}

export interface IRecipeService {
    createRecipe(userId: number, recipeDto: RecipeDto): Promise<number | null>;
    getAllRecipes(userId: number): Promise<RecipeDto[] | null>;
    getRecipe(userId: number, recipeId: number): Promise<RecipeDto | null>;
}

export const createRecipeService = ({
    recipeRepository
}: IRecipeServiceDependencies): IRecipeService => {
    const createRecipe = async (userId: number, recipeDto: RecipeDto): Promise<number | null> => {
        return await recipeRepository.createRecipe(userId, recipeDto);
    };

    const getAllRecipes = async (userId: number) => {
        return await recipeRepository.getAllRecipes(userId);
    }

    const getRecipe = async (userId: number, recipeId: number) => {
        return await recipeRepository.getRecipe(userId, recipeId);
    }

    return {
        createRecipe,
        getAllRecipes,
        getRecipe,
    };
}