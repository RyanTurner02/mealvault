import express, { Router } from "express";
import { IUserController } from "@controller/userController";
import { IAuthMiddleware } from "@middleware/authMiddleware";

interface IUserRouteDependencies {
    authMiddleware: IAuthMiddleware,
    userController: IUserController;
};

export const createUserRoute = ({
    authMiddleware, userController
}: IUserRouteDependencies): Router => {
    const router: Router = express.Router();

    router.use(express.json());
    router.post("/create", userController.createUser);
    router.post("/login", userController.loginUser);
    router.get("/logout", userController.logoutUser);
    router.get("/me", authMiddleware.authenticateToken, userController.getCurrentUser);
    router.get("/:userId", userController.getUserById);

    return router;
}