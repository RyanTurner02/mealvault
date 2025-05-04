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

export const getUserById = async (req: Request<{ userId: number }>, res: Response): Promise<any> => {
    res.json(await userService.getUser(req.params.userId));
}