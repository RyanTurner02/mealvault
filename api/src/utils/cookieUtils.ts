import { CookieOptions } from "express";

export interface ICookiePayload {
    name: string;
    value: string;
    options: CookieOptions;
};

export interface ICookieUtils {
    createAccessTokenCookie(accessToken: string): ICookiePayload;
    createAuthCookies(accessToken: string, refreshToken: string): ICookiePayload[];
    createEmptyAuthCookies(): ICookiePayload[];
};

export const createCookieUtils = (): ICookieUtils => {
    const createAccessTokenCookie = (accessToken: string): ICookiePayload => {
        const cookieOptions: CookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 900000
        };

        const accessTokenCookie: ICookiePayload = {
            name: "access_token",
            value: accessToken,
            options: cookieOptions,
        };

        return accessTokenCookie;
    }

    const createAuthCookies = (accessToken: string, refreshToken: string): ICookiePayload[] => {
        const accessTokenCookie = createAccessTokenCookie(accessToken);

        const refreshTokenCookieOptions: CookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 604800000
        };

        const refreshTokenCookie: ICookiePayload = {
            name: "refresh_token",
            value: refreshToken,
            options: refreshTokenCookieOptions,
        };

        return [accessTokenCookie, refreshTokenCookie];
    };

    const createEmptyAuthCookies = (): ICookiePayload[] => {
        const cookieOptions: CookieOptions = {
            maxAge: 0,
        };

        const accessTokenCookie: ICookiePayload = {
            name: "access_token",
            value: "",
            options: cookieOptions,
        };

        const refreshTokenCookie: ICookiePayload = {
            name: "refresh_token",
            value: "",
            options: cookieOptions,
        };

        return [accessTokenCookie, refreshTokenCookie];
    }

    return {
        createAccessTokenCookie,
        createAuthCookies,
        createEmptyAuthCookies,
    };
}