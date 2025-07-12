import { CookieOptions, Request, Response } from "express";

export interface IAuthController {
    logout(req: Request, res: Response): any;
};

export const createAuthController = () => {
    const logout = (req: Request, res: Response): any => {
        const cookieOptions: CookieOptions = {
            maxAge: 0
        };

        res.cookie("access_token", "", cookieOptions);
        res.cookie("refresh_token", "", cookieOptions);
        res.status(200).json({ message: "Logged out" });
    }

    return {
        logout
    };
}