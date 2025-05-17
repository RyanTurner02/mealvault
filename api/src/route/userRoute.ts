import express, { Router } from "express";
import cors from "cors";
import * as userController from "@controller/userController";
import * as userAuthMiddleware from "@middleware/userAuthMiddleware";

const router: Router = express.Router();
router.use(express.json());
router.use(cors());

router.get("/", userAuthMiddleware.authenticateToken, userController.getAllUsers);
router.post("/create", userController.createUser);
router.post("/login", userController.loginUser);
router.get("/:userId", userController.getUserById);

module.exports = router;