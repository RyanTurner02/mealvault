import { CookieOptions } from "express";

export interface ICookiePayload {
    name: string;
    value: string;
    options: CookieOptions;
};

export interface ICookieUtils {
    createAuthCookies(accessToken: string, refreshToken: string): ICookiePayload[];
};

export const createCookieUtils = (): ICookieUtils => {
    const createAuthCookies = (accessToken: string, refreshToken: string): ICookiePayload[] => {
        const cookieOptions: CookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 900000
        };

        const authCookie: ICookiePayload = {
            name: "access_token",
            value: accessToken,
            options: cookieOptions,
        };

        cookieOptions.maxAge = 604800000;

        const refreshCookie: ICookiePayload = {
            name: "refresh_token",
            value: refreshToken,
            options: cookieOptions,
        };

        return [authCookie, refreshCookie];
    };

    return {
        createAuthCookies,
    };
}