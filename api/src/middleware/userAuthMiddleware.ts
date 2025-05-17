import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export const authenticateToken = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err: any, user: any) => {
        if (err) {
            console.log(err);
            return res.sendStatus(403);
        }

        (req as Request & { user?: any }).user = user;
        next();
    });
}