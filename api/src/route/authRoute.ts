import express, { Router } from "express";
import { createAuthController, IAuthController } from "@controller/authController";

const router: Router = express.Router();
const authController: IAuthController = createAuthController();

router.use(express.json());
router.post("/logout", authController.logout);

export default router;