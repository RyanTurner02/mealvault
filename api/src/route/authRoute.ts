import express, { Router } from "express";
import * as AuthController from "@controller/authController";

const router: Router = express.Router();
router.use(express.json());

router.get("/has-access-token", AuthController.hasAccessToken);
router.get("/has-refresh-token", AuthController.hasRefreshToken);
router.get("/refresh", AuthController.refreshAccessToken);
router.post("/logout", AuthController.logout);

export default router;