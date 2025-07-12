import express, { Router } from "express";
import { IUserController } from "@controller/userController";
import * as authMiddleware from "@middleware/authMiddleware";

interface IUserRouteDependencies {
    userController: IUserController;
};

export const createUserRoute = ({ userController }: IUserRouteDependencies): express.Router => {
    const router: Router = express.Router();

    router.use(express.json());
    router.post("/create", userController.createUser);
    router.post("/login", userController.loginUser);
    router.get("/logout", userController.logoutUser);
    router.get("/me", authMiddleware.authenticateToken, userController.getCurrentUser);
    router.get("/:userId", userController.getUserById);

    return router;
}