import { JwtPayload } from "@typings/auth";
import * as jwt from "jsonwebtoken";

export const generateAccessToken = (id: number) => {
    if (!process.env.ACCESS_TOKEN_SECRET) {
        return null;
    }

    const payload: JwtPayload = { id };
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}

export const generateRefreshToken = (id: number) => {
    if (!process.env.REFRESH_TOKEN_SECRET) {
        return null;
    }

    const payload: JwtPayload = { id };
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}