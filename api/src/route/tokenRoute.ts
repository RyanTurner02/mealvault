import express, { Router } from "express";
import { createTokenController, ITokenController } from "@controller/tokenController";
import { createTokenService, ITokenService } from "@service/tokenService";

const router: Router = express.Router();
const tokenService: ITokenService = createTokenService();
const tokenController: ITokenController = createTokenController({ tokenService });

router.use(express.json());
router.get("/has-access-token", tokenController.hasAccessToken);
router.get("/has-refresh-token", tokenController.hasRefreshToken);
router.get("/refresh", tokenController.refreshAccessToken);

export default router;