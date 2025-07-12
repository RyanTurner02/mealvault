import express, { Router } from "express";
import { createUserController, IUserController } from "@controller/userController";
import * as authMiddleware from "@middleware/authMiddleware";
import { createAuthService, IAuthService } from "@service/authService";
import { createUserService, IUserService } from "@service/userService";
import { createUserRepository, IUserRepository } from "@repository/userRepository";
import { db } from "@db/index";

const router: Router = express.Router();
const userRepository: IUserRepository = createUserRepository({ db });
const userService: IUserService = createUserService({ userRepository });
const authService: IAuthService = createAuthService();
const userController: IUserController = createUserController({ userService, authService });

router.use(express.json());
router.post("/create", userController.createUser);
router.post("/login", userController.loginUser);
router.get("/me", authMiddleware.authenticateToken, userController.getCurrentUser);
router.get("/:userId", userController.getUserById);

export default router;