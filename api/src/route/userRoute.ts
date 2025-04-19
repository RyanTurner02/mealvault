import express, { Request, Response, Router } from "express";
import { getAllUsers, getUser } from "../repository/userRepository";

const router: Router = express.Router();
router.use(express.json());

router.get("/", async (req: Request, res: Response): Promise<any> => {
  res.json(await getAllUsers());
});

router.post("/create", (req: Request, res: Response): any => {
  const account = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  res.status(201).json({ message: "Account created", data: account });
});

router.get("/:userId", async (req: Request<{ userId: number }>, res: Response): Promise<any> => {
  res.json(await getUser(req.params.userId));
});

module.exports = router;