import express, { Router } from "express";
import { createAuthController, IAuthController } from "@controller/authController";

const router: Router = express.Router();
const authController: IAuthController = createAuthController();

router.use(express.json());
router.get("/has-access-token", authController.hasAccessToken);
router.get("/has-refresh-token", authController.hasRefreshToken);
router.get("/refresh", authController.refreshAccessToken);
router.post("/logout", authController.logout);

export default router;