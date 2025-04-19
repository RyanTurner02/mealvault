import express, { Router } from "express";

const router: Router = express.Router();
router.use(express.json());
const userController = require("../controller/userController");

router.get("/", userController.getAllUsers);
router.post("/create", userController.createUser);
router.get("/:userId", userController.getUserById);

module.exports = router;