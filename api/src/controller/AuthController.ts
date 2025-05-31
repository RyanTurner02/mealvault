import { generateAccessToken } from "@service/userAuthService";
import { CookieOptions, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

export const refreshAccessToken = (req: Request, res: Response): any => {
    const refreshToken = req.cookies?.refresh_token;

    if (!refreshToken) {
        return res.sendStatus(401);
    }
    
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, (err: any, user: any) => {
        if (err) {
            return res.status(406).json({ message: 'Unauthorized' });
        }

        const accessToken = generateAccessToken(user.id, user.email);
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