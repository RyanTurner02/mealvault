import * as jwt from "jsonwebtoken";

interface JwtPayload {
    id: number;
    email: string;
}

export const generateAccessToken = (id: number, email: string) => {
    if (!process.env.ACCESS_TOKEN_SECRET) {
        return null;
    }

    const payload: JwtPayload = { id, email };
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '7d' });
}

export const generateRefreshToken = (id: number, email: string) => {
    if (!process.env.REFRESH_TOKEN_SECRET) {
        return null;
    }

    const payload: JwtPayload = { id, email };
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '30d' });
}