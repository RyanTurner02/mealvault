import { RecipeDto } from "@dtos/recipe-dto";
import { IRecipeService } from "@service/recipe-service";
import { UserRequest } from "@typings/express";
import { Response } from "express";

interface IRecipeControllerDependencies {
    recipeService: IRecipeService,
};

export interface IRecipeController {
    createRecipe(req: UserRequest, res: Response): Promise<void>;
    getRecipes(req: UserRequest, res: Response): Promise<void>;
    getRecipe(req: UserRequest<{ recipeId: string }>, res: Response): Promise<void>;
    deleteRecipe(req: UserRequest<{ recipeId: string }>, res: Response): Promise<void>;
    updateRecipe(req: UserRequest<{ recipeId: string }>, res: Response): Promise<void>;
};

export const createRecipeController = ({
    recipeService
}: IRecipeControllerDependencies): IRecipeController => {
    const createRecipe = async (req: UserRequest, res: Response): Promise<void> => {
        const recipe: RecipeDto = {
            name: req.body.name,
            prepTime: req.body.prepTime,
            cookTime: req.body.cookTime,
            servings: req.body.servings,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions,
            externalLink: req.body?.externalLink,
        };

        const result: number | null = await recipeService.createRecipe(req.user!.id, recipe);

        if (!result) {
            res.status(500).send("Unable to create recipe");
            return;
        }

        res.status(200).json(result);
    }

    const getRecipes = async (req: UserRequest, res: Response): Promise<void> => {
        let recipes: RecipeDto[] | null = [];
        const query: string = req.query.q as string;

        if (query) {
            recipes = await recipeService.searchRecipes(req.user!.id, query);
        } else {
            recipes = await recipeService.getAllRecipes(req.user!.id);
        }

        res.status(200).json(recipes)
    }

    const getRecipe = async (req: UserRequest<{ recipeId: string }>, res: Response): Promise<void> => {
        const recipe: RecipeDto | null = await recipeService.getRecipe(req.user!.id, Number(req.params.recipeId));

        res.status(200).json(recipe);
    }

    const deleteRecipe = async (req: UserRequest<{ recipeId: string }>, res: Response): Promise<void> => {
        const recipeDeleted: boolean = await recipeService.deleteRecipe(
            req.user!.id,
            Number(req.params.recipeId));

        if (!recipeDeleted) {
            res.status(404).json({ message: "Recipe does not exist" });
            return;
        }

        res.sendStatus(204);
    }

    const updateRecipe = async (req: UserRequest<{ recipeId: string }>, res: Response): Promise<void> => {
        const recipe: RecipeDto = {
            name: req.body.name,
            prepTime: req.body.prepTime,
            cookTime: req.body.cookTime,
            servings: req.body.servings,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions,
            externalLink: req.body?.externalLink,
        };

        const result: number = await recipeService.updateRecipe(req.user!.id, Number(req.params.recipeId), recipe);
        res.status(200).json(result);
    }

    return {
        createRecipe,
        getRecipes,
        getRecipe,
        deleteRecipe,
        updateRecipe,
    };
}