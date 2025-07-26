import { RecipeDto } from "@dtos/recipe.dto";
import { IRecipeRepository } from "@repository/recipe.repository";

interface IRecipeServiceDependencies {
    recipeRepository: IRecipeRepository;
}

export interface IRecipeService {
    createRecipe(recipeDto: RecipeDto): boolean;
}

export const createRecipeService = ({
    recipeRepository
}: IRecipeServiceDependencies): IRecipeService => {
    const createRecipe = (recipeDto: RecipeDto): boolean => {
        recipeRepository.createRecipe(recipeDto);
        
        return true;
    };

    return {
        createRecipe,
    };
}