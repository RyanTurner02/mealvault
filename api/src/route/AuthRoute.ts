import express, { Router } from "express";
import * as AuthController from "@controller/AuthController";

const router: Router = express.Router();
router.use(express.json());

router.get("/refresh", AuthController.refreshToken);

module.exports = router;