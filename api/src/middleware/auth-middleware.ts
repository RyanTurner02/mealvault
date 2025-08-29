import { Response, NextFunction } from "express";
import { UserRequest } from "@typings/express/index";
import * as jwt from "jsonwebtoken";

export interface IAuthMiddleware {
    authenticateToken(req: UserRequest, res: Response, next: NextFunction): Promise<any>
};

export const createAuthMiddleware = (): IAuthMiddleware => {
    const authenticateToken = async (req: UserRequest, res: Response, next: NextFunction): Promise<any> => {
        const accessToken = req.cookies.access_token;

        if (!accessToken) return res.sendStatus(401);

        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string, (err: any, user: any) => {
            if (err) {
                console.log(err);
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    }

    return {
        authenticateToken,
    };
}