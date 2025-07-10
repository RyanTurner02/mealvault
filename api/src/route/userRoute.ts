import express, { Router } from "express";
import { createUserController, IUserController } from "@controller/userController";
import * as userAuthMiddleware from "@middleware/userAuthMiddleware";
import { createUserAuthService, IUserAuthService } from "@service/userAuthService";
import { createUserService, IUserService } from "@service/userService";
import { createUserRepository, IUserRepository } from "@repository/userRepository";
import { db } from "@db/index";

const router: Router = express.Router();
const userRepository: IUserRepository = createUserRepository({ db });
const userService: IUserService = createUserService({ userRepository });
const userAuthService: IUserAuthService = createUserAuthService();
const userController: IUserController = createUserController({ userService, userAuthService });

router.use(express.json());
router.post("/create", userController.createUser);
router.post("/login", userController.loginUser);
router.get("/me", userAuthMiddleware.authenticateToken, userController.getCurrentUser);
router.get("/:userId", userController.getUserById);

export default router;