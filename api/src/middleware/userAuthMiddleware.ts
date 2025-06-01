import { Response, NextFunction } from "express";
import { UserRequest } from "@typings/express/index";
import * as jwt from "jsonwebtoken";

export const authenticateToken = async (req: UserRequest, res: Response, next: NextFunction): Promise<any> => {
    const token = req.cookies.access_token;

    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err: any, user: any) => {
        if (err) {
            console.log(err);
            return res.sendStatus(403);
        }

        req.user = user;
        next();
    });
}