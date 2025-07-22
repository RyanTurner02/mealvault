import { createTokenController, ITokenController } from "@controller/tokenController";
import { ITokenService } from "@service/tokenService";
import { Request, Response } from "express";
import { createRequest, createResponse, MockRequest, MockResponse } from "node-mocks-http";
import * as jwt from "jsonwebtoken";
import "dotenv/config";

describe("TokenController", () => {
    let tokenController: ITokenController;

    const mockTokenService: jest.Mocked<ITokenService> = {
        generateAccessToken: jest.fn(),
        generateRefreshToken: jest.fn(),
    }

    beforeAll(() => {
        tokenController = createTokenController({
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
});