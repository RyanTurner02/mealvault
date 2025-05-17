import * as jwt from "jsonwebtoken";

export const generateAccessToken = (email: string) => {
    return jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '7d' });
}

export const generateRefreshToken = (email: string) => {
    return jwt.sign(email, process.env.REFRESH_TOKEN_SECRET!);
}