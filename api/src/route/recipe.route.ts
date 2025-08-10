import express, { Router } from "express";
import { IRecipeController } from "@controller/recipe.controller";
import { IAuthMiddleware } from "@middleware/authMiddleware";

interface IRecipeRouteDependencies {
    authMiddleware: IAuthMiddleware,
    recipeController: IRecipeController;
};

export const createRecipeRoute = ({
    authMiddleware,
    recipeController
}: IRecipeRouteDependencies): Router => {
    const router: Router = express.Router();

    router.use(express.json());
    router.post("/create", authMiddleware.authenticateToken, recipeController.createRecipe);
    router.get("/", authMiddleware.authenticateToken, recipeController.getRecipes);
    router.get("/:recipeId", authMiddleware.authenticateToken, recipeController.getRecipe);
    router.delete("/:recipeId/delete", authMiddleware.authenticateToken, recipeController.deleteRecipe);
    router.put("/:recipeId/edit", authMiddleware.authenticateToken, recipeController.updateRecipe);

    return router;
}