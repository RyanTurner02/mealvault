import { Request, Response } from "express";
import * as userService from "@service/userService";

export const getAllUsers = async (req: Request, res: Response): Promise<any> => {
    res.json(await userService.getAllUsers());
}

export const createUser = async (req: Request, res: Response): Promise<any> => {
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };

    res.json(await userService.createUser(user));
}

export const loginUser = async (req: Request, res: Response): Promise<any> => {
    const loginDetails = {
        email: req.body.email,
        password: req.body.password
    }

    const loginSuccess = await userService.loginUser(loginDetails);

    if(!loginSuccess) {
        res.status(500).send("Invalid login");
        return;
    }
    res.status(200).send("Logged in");
}

export const getUserById = async (req: Request<{ userId: number }>, res: Response): Promise<any> => {
    res.json(await userService.getUser(req.params.userId));
}