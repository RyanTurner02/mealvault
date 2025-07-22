import { ITokenService } from "@service/tokenService";
import { CookieOptions, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

interface ITokenControllerDependencies {
    tokenService: ITokenService;
};

export interface ITokenController {
    hasAccessToken(req: Request, res: Response): any;
    hasRefreshToken(req: Request, res: Response): any;
    refreshAccessToken(req: Request, res: Response): any;
};

export const createTokenController = ({
    tokenService
}: ITokenControllerDependencies) => {
    const verifyTokenAsync = async (token: string | null, secretKey: string): Promise<boolean> => {
        if (!token) {
            return Promise.resolve(false);
        }

        return new Promise((resolve) => {
            jwt.verify(token, secretKey, (err) => {
                resolve(!err);
            });
        });
    }

    const hasAccessToken = async (req: Request, res: Response): Promise<void> => {
        const result: boolean = await verifyTokenAsync(
            req.cookies?.access_token,
            process.env.ACCESS_TOKEN_SECRET!);

        res.status(200).json({ hasAccessToken: result });
    }

    const hasRefreshToken = async (req: Request, res: Response): Promise<void> => {
        const result: boolean = await verifyTokenAsync(
            req.cookies?.refresh_token,
            process.env.REFRESH_TOKEN_SECRET!);

        res.status(200).json({ hasRefreshToken: result });
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

            const accessToken = tokenService.generateAccessToken(user.id);
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

    return {
        hasAccessToken,
        hasRefreshToken,
        refreshAccessToken,
    };
}