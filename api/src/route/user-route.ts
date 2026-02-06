import express, { Router } from "express";
import { IUserController } from "@controller/user-controller";
import { IAuthMiddleware } from "@middleware/auth-middleware";

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
    router.post("/logout", userController.logoutUser);
    router.get("/me", authMiddleware.authenticateToken, userController.getCurrentUser);
    router.patch("/edit-name", authMiddleware.authenticateToken, userController.editName);
    router.patch("/edit-email", authMiddleware.authenticateToken, userController.editEmail);
    router.patch("/edit-password", authMiddleware.authenticateToken, userController.editPassword);
    router.delete("/delete", authMiddleware.authenticateToken, userController.deleteUser);
    router.get("/:userId", userController.getUserById);

    return router;
}