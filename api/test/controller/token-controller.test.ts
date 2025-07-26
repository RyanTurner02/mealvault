import { createTokenController, ITokenController } from "@controller/tokenController";
import { ITokenService } from "@service/tokenService";
import { CookieOptions, Request, Response } from "express";
import { createRequest, createResponse, MockRequest, MockResponse } from "node-mocks-http";
import * as jwt from "jsonwebtoken";
import "dotenv/config";
import { ICookiePayload, ICookieUtils } from "@utils/cookieUtils";
import { faker } from "@faker-js/faker/.";

describe("TokenController", () => {
    let tokenController: ITokenController;

    const mockCookieUtils: jest.Mocked<ICookieUtils> = {
        createAccessTokenCookie: jest.fn(),
        createAuthCookies: jest.fn(),
        createEmptyAuthCookies: jest.fn(),
    }

    const mockTokenService: jest.Mocked<ITokenService> = {
        generateAccessToken: jest.fn(),
        generateRefreshToken: jest.fn(),
    }

    beforeAll(() => {
        tokenController = createTokenController({
            cookieUtils: mockCookieUtils,
            tokenService: mockTokenService
        });
    });

    describe("hasAccessToken", () => {
        it("has an access token", async () => {
            const accessToken: string = jwt.sign(
                { id: 0 },
                process.env.ACCESS_TOKEN_SECRET!,
                { expiresIn: '15m' });

            const request: MockRequest<Request> = createRequest({
                method: "GET",
                url: "/api/token/has-access-token",
                cookies: {
                    access_token: accessToken,
                },
            });

            const response: MockResponse<Response> = createResponse();

            await tokenController.hasAccessToken(request, response);

            expect(response.statusCode).toBe(200);
            expect(response._getJSONData()).toEqual({
                hasAccessToken: true
            });
        });

        it("does not have an access token", async () => {
            const request: MockRequest<Request> = createRequest({
                method: "GET",
                url: "/api/token/has-access-token",
            });

            const response: MockResponse<Response> = createResponse();

            await tokenController.hasAccessToken(request, response);

            expect(response.statusCode).toBe(200);
            expect(response._getJSONData()).toEqual({
                hasAccessToken: false
            });
        });
    });

    describe("hasRefreshToken", () => {
        it("has a refresh token", async () => {
            const refreshToken: string = jwt.sign(
                { id: 0 },
                process.env.REFRESH_TOKEN_SECRET!,
                { expiresIn: '7d' });

            const request: MockRequest<Request> = createRequest({
                method: "GET",
                url: "/api/token/has-refresh-token",
                cookies: {
                    refresh_token: refreshToken,
                },
            });

            const response: MockResponse<Response> = createResponse();

            await tokenController.hasRefreshToken(request, response);

            expect(response.statusCode).toBe(200);
            expect(response._getJSONData()).toEqual({
                hasRefreshToken: true
            });
        });

        it("does not have a refresh token", async () => {
            const request: MockRequest<Request> = createRequest({
                method: "GET",
                url: "/api/token/has-refresh-token",
            });

            const response: MockResponse<Response> = createResponse();

            await tokenController.hasRefreshToken(request, response);

            expect(response.statusCode).toBe(200);
            expect(response._getJSONData()).toEqual({
                hasRefreshToken: false
            });
        });
    });

    describe("refreshAccessToken", () => {
        it("refreshes the access token", async () => {
            const id: number = 0;
            const accessToken: string = faker.internet.jwt();
            const refreshToken: string = jwt.sign(
                { id: id },
                process.env.REFRESH_TOKEN_SECRET!,
                { expiresIn: '7d' });
            const accessTokenCookieOptions: CookieOptions = {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 900000
            };
            const accessTokenCookie: ICookiePayload = {
                name: "access_token",
                value: accessToken,
                options: accessTokenCookieOptions,
            };
            const request: MockRequest<Request> = createRequest({
                method: "GET",
                url: "/api/token/refresh",
                cookies: {
                    refresh_token: refreshToken,
                },
            });

            mockCookieUtils.createAccessTokenCookie.mockReturnValue(accessTokenCookie);
            mockTokenService.generateAccessToken.mockReturnValue(accessToken);

            const response: MockResponse<Response> = createResponse();
            response.cookie = jest.fn();

            await tokenController.refreshAccessToken(request, response);

            expect(mockTokenService.generateAccessToken).toHaveBeenCalledWith(id);
            expect(mockTokenService.generateAccessToken).toHaveBeenCalledTimes(1);

            expect(mockCookieUtils.createAccessTokenCookie).toHaveBeenCalledWith(accessToken);
            expect(mockCookieUtils.createAccessTokenCookie).toHaveBeenCalledTimes(1);

            expect(response.cookie).toHaveBeenCalledWith(accessTokenCookie.name, accessTokenCookie.value, accessTokenCookie.options);
            expect(response.cookie).toHaveBeenCalledTimes(1);

            expect(response.statusCode).toBe(200);
        });

        it("does not have a valid refresh token", async () => {
            const request: MockRequest<Request> = createRequest({
                method: "GET",
                url: "/api/token/refresh",
                cookies: {
                    refresh_token: faker.internet.jwt()
                }
            });

            const response: MockResponse<Response> = createResponse();

            await tokenController.refreshAccessToken(request, response);

            expect(response.statusCode).toBe(401);
        });

        it("does not have a refresh token", async () => {
            const request: MockRequest<Request> = createRequest({
                method: "GET",
                url: "/api/token/refresh",
            });

            const response: MockResponse<Response> = createResponse();

            await tokenController.refreshAccessToken(request, response);

            expect(response.statusCode).toBe(401);
        })
    });
});