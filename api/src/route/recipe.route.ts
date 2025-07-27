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
    router.get("/:recipeId", authMiddleware.authenticateToken, recipeController.getRecipe);

    return router;
}