import * as jwt from "jsonwebtoken";

export interface ITokenService {
    generateAccessToken(id: number): string;
    generateRefreshToken(id: number): string;
}

export const createTokenService = (): ITokenService => {
    const generateAccessToken = (id: number): string => {
        return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '15m' });
    }

    const generateRefreshToken = (id: number): string => {
        return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '7d' });
    }

    return {
        generateAccessToken,
        generateRefreshToken
    };
}