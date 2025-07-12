import { createAuthService, IAuthService } from "@service/authService";
import { CookieOptions, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

const authService: IAuthService = createAuthService();

export interface IAuthController {
    hasAccessToken(req: Request, res: Response): any;
    hasRefreshToken(req: Request, res: Response): any;
    refreshAccessToken(req: Request, res: Response): any;
    logout(req: Request, res: Response): any;
};

export const createAuthController = () => {
    const hasAccessToken = (req: Request, res: Response): any => {
        const accessToken = req.cookies?.access_token;

        if (!accessToken) {
            return res.status(200).json({ hasAccessToken: false });
        }

        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!, (err: any) => {
            if (err) {
                return res.status(200).json({ hasAccessToken: false });
            }
            return res.status(200).json({ hasAccessToken: true });
        });
    }

    const hasRefreshToken = (req: Request, res: Response): any => {
        const refreshToken = req.cookies?.refresh_token;

        if (!refreshToken) {
            return res.status(200).json({ hasRefreshToken: false });
        }

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, (err: any) => {
            if (err) {
                return res.status(200).json({ hasRefreshToken: false });
            }
            return res.status(200).json({ hasRefreshToken: true });
        });
    }

    const refreshAccessToken = (req: Request, res: Response): any => {
        const refreshToken = req.cookies?.refresh_token;

        if (!refreshToken) {
            return res.sendStatus(401);
        }

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, (err: any, user: any) => {
            if (err) {
                return res.sendStatus(401);
            }

            const accessToken = authService.generateAccessToken(user.id);
            const cookieOptions: CookieOptions = {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 900000
            };
            res.cookie("access_token", accessToken, cookieOptions);
            return res.sendStatus(200);
        });
    }

    const logout = (req: Request, res: Response): any => {
        const cookieOptions: CookieOptions = {
            maxAge: 0
        };

        res.cookie("access_token", "", cookieOptions);
        res.cookie("refresh_token", "", cookieOptions);
        res.status(200).json({ message: "Logged out" });
    }

    return {
        hasAccessToken,
        hasRefreshToken,
        refreshAccessToken,
        logout
    };
}