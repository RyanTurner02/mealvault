import { JwtPayload } from "@typings/token";
import * as jwt from "jsonwebtoken";

export interface ITokenService {
    generateAccessToken(id: number): string;
    generateRefreshToken(id: number): string;
}

export const createTokenService = (): ITokenService => {
    const generateAccessToken = (id: number): string => {
        const payload: JwtPayload = { id };
        return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '15m' });
    }

    const generateRefreshToken = (id: number): string => {
        const payload: JwtPayload = { id };
        return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '7d' });
    }

    return {
        generateAccessToken,
        generateRefreshToken
    };
}