import { CookieOptions, Request, Response } from "express";
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
    const loginDetails = {
        email: req.body.email,
        password: req.body.password
    }

    const loginSuccess = await userService.loginUser(loginDetails);

    if(!loginSuccess) {
        return res.status(401).send("Invalid email or password");
    }

    const accessToken = userAuthService.generateAccessToken(loginDetails.email);
    const cookieOptions: CookieOptions = {
        httpOnly: true,
        secure: false,
        maxAge: 60 * 60 * 1000
    };

    res.cookie('user_session', accessToken, cookieOptions);
    return res.status(200).json({ accessToken: accessToken });
}

export const getUserById = async (req: Request<{ userId: number }>, res: Response): Promise<any> => {
    res.json(await userService.getUser(req.params.userId));
}