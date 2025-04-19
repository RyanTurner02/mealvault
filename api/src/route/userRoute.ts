import express, { Request, Response, Router } from "express";
import { getUsers } from "../repository/db";

const router: Router = express.Router();
router.use(express.json());

router.get("/", async (req: Request, res: Response): Promise<any> => {
  await getUsers();
  res.json("User");
});

router.post("/create", (req: Request, res: Response): any => {
  const account = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  res.status(201).json({ message: "Account created", data: account });
});

module.exports = router;