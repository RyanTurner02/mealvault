import { JwtPayload } from "@typings/token";
import * as jwt from "jsonwebtoken";

export interface ITokenService {
    generateAccessToken(id: number): string | null;
    generateRefreshToken(id: number): string | null;
}

export const createTokenService = (): ITokenService => {
    const generateAccessToken = (id: number): string | null => {
        if (!process.env.ACCESS_TOKEN_SECRET) {
            return null;
        }

        const payload: JwtPayload = { id };
        return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    }

    const generateRefreshToken = (id: number): string | null => {
        if (!process.env.REFRESH_TOKEN_SECRET) {
            return null;
        }

        const payload: JwtPayload = { id };
        return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    }

    return {
        generateAccessToken,
        generateRefreshToken
    };
}