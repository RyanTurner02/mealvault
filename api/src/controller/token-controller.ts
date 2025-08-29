import { ITokenService } from "@service/token-service";
import { ICookiePayload, ICookieUtils } from "@utils/cookie-utils";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

interface ITokenControllerDependencies {
    cookieUtils: ICookieUtils
    tokenService: ITokenService;
};

export interface ITokenController {
    hasAccessToken(req: Request, res: Response): Promise<void>;
    hasRefreshToken(req: Request, res: Response): Promise<void>;
    refreshAccessToken(req: Request, res: Response): Promise<void>;
};

export const createTokenController = ({
    cookieUtils,
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

    const verifyJwtAsync = async (token: string, secretKey: string): Promise<JwtPayload | null> => {
        return new Promise((resolve) => {
            jwt.verify(token, secretKey, (err, decoded) => {
                if (err || typeof decoded !== "object" || decoded === null) {
                    return resolve(null);
                }
                resolve(decoded as JwtPayload);
            });
        })
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

    const refreshAccessToken = async (req: Request, res: Response): Promise<void> => {
        const refreshToken = req.cookies?.refresh_token;

        if (!refreshToken) {
            res.sendStatus(401);
            return;
        }

        const decodedToken: JwtPayload | null = await verifyJwtAsync(refreshToken, process.env.REFRESH_TOKEN_SECRET!);

        if (!decodedToken) {
            res.sendStatus(401);
            return;
        }

        const accessToken: string = tokenService.generateAccessToken(decodedToken.id);
        const accessTokenCookie: ICookiePayload = cookieUtils.createAccessTokenCookie(accessToken);

        res.cookie(accessTokenCookie.name, accessTokenCookie.value, accessTokenCookie.options);
        res.sendStatus(200);
    }

    return {
        hasAccessToken,
        hasRefreshToken,
        refreshAccessToken,
    };
}