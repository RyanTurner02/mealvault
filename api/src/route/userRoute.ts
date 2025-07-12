import express, { Router } from "express";
import { createUserController, IUserController } from "@controller/userController";
import * as authMiddleware from "@middleware/authMiddleware";
import { createUserService, IUserService } from "@service/userService";
import { createUserRepository, IUserRepository } from "@repository/userRepository";
import { db } from "@db/index";
import { createTokenService, ITokenService } from "@service/tokenService";
import { createCookieUtils, ICookieUtils } from "@utils/cookieUtils";

const router: Router = express.Router();
const userRepository: IUserRepository = createUserRepository({ db });
const userService: IUserService = createUserService({ userRepository });
const tokenService: ITokenService = createTokenService();
const cookieUtils: ICookieUtils = createCookieUtils();
const userController: IUserController = createUserController({
    userService,
    tokenService,
    cookieUtils,
});

router.use(express.json());
router.post("/create", userController.createUser);
router.post("/login", userController.loginUser);
router.get("/logout", userController.logoutUser);
router.get("/me", authMiddleware.authenticateToken, userController.getCurrentUser);
router.get("/:userId", userController.getUserById);

export default router;