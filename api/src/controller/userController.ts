import { CookieOptions, Request, Response } from "express";
import { UserRequest } from "@typings/express/index";
import * as userService from "@service/userService";
import * as userAuthService from "@service/userAuthService";

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
    if (!req.body.email || !req.body.password) {
        return res.status(400).send("Email and password are required");
    }

    const user = await userService.getUserByLogin(req.body.email, req.body.password);

    if(!user) {
        return res.status(401).send("Invalid email or password");
    }

    const accessToken = userAuthService.generateAccessToken(user.getId(), user.getEmail());
    const refreshToken = userAuthService.generateRefreshToken(user.getId(), user.getEmail());

    if (!accessToken || !refreshToken) {
        return res.status(500).send("Token generation failed");
    }

    const cookieOptions: CookieOptions = {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000
    };

    res.cookie('access_token', accessToken, cookieOptions);
    res.cookie('refresh_token', refreshToken, cookieOptions);

    return res.sendStatus(200);
}

export const getCurrentUser = async (req: UserRequest, res: Response): Promise<any> => {
    if (!req.user) {
        return res.status(401).send("Unauthorized");
    }

    return res.sendStatus(200);
}

export const getUserById = async (req: Request<{ userId: number }>, res: Response): Promise<any> => {
    res.json(await userService.getUser(req.params.userId));
}