import { generateAccessToken } from "@service/userAuthService";
import { CookieOptions, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

export const hasAccessToken = (req: Request, res: Response): any => {
    const accessToken = req.cookies?.access_token;

    if (!accessToken) {
        return res.status(200).json({ hasAccessToken: false });
    }

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!, (err: any) => {
        if (err) {
            return res.status(200).json({hasAccessToken: false});
        }
        return res.status(200).json({ hasAccessToken: true });
    });
}

export const hasRefreshToken = (req: Request, res: Response): any => {
    const refreshToken = req.cookies?.refresh_token;

    if(!refreshToken) {
        return res.status(200).json({ hasRefreshToken: false });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, (err: any) => {
        if (err) {
            return res.status(200).json({ hasRefreshToken: false });
        }
        return res.status(200).json({ hasRefreshToken: true });
    });
}

export const refreshAccessToken = (req: Request, res: Response): any => {
    const refreshToken = req.cookies?.refresh_token;

    if (!refreshToken) {
        return res.sendStatus(401);
    }
    
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, (err: any, user: any) => {
        if (err) {
            return res.sendStatus(401);
        }

        const accessToken = generateAccessToken(user.id);
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

export const logout = (req: Request, res: Response): any => {
    const cookieOptions: CookieOptions = {
        maxAge: 0
    };

    res.cookie("access_token", "", cookieOptions);
    res.cookie("refresh_token", "", cookieOptions);
    res.status(200).json({ message: "Logged out" });
}