import { createUserController, IUserController } from "@controller/userController";
import { IUserService } from "@service/userService";
import { CookieOptions, Request, Response } from "express";
import { createRequest, createResponse, MockRequest, MockResponse } from "node-mocks-http";
import { faker } from "@faker-js/faker";
import User from "@model/user";
import { ITokenService } from "@service/tokenService";
import { ICookiePayload, ICookieUtils } from "@utils/cookieUtils";
import { UserDto } from "@dtos/user.dto";

describe("UserController", () => {
    let userController: IUserController;

    const mockUserService: jest.Mocked<IUserService> = {
        createUser: jest.fn(),
        getUserByLogin: jest.fn(),
        getUser: jest.fn(),
    };

    const mockCookieUtils: jest.Mocked<ICookieUtils> = {
        createAccessTokenCookie: jest.fn(),
        createAuthCookies: jest.fn(),
        createEmptyAuthCookies: jest.fn(),
    };

    const mockTokenService: jest.Mocked<ITokenService> = {
        generateAccessToken: jest.fn(),
        generateRefreshToken: jest.fn(),
    }

    beforeAll(async () => {
        userController = createUserController({
            userService: mockUserService,
            cookieUtils: mockCookieUtils,
            tokenService: mockTokenService,
        });
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("createUser", () => {
        it("creates a new user", async () => {
            const expectedId: number = 1;
            const expectedStatusCode: number = 200;
            const accessToken: string = faker.internet.jwt();
            const refreshToken: string = faker.internet.jwt();
            const user: UserDto = {
                name: faker.internet.displayName(),
                email: faker.internet.exampleEmail(),
                password: faker.internet.password()
            };
            const accessTokenCookieOptions: CookieOptions = {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 900000
            };
            const refreshTokenCookieOptions: CookieOptions = {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 604800000
            };
            const authCookies: ICookiePayload[] = [
                { name: "access_token", value: accessToken, options: accessTokenCookieOptions },
                { name: "refresh_token", value: refreshToken, options: refreshTokenCookieOptions }
            ];
            const request: MockRequest<Request> = createRequest({
                method: "POST",
                url: "/api/user/create",
                body: {
                    name: user.name,
                    email: user.email,
                    password: user.password,
                }
            });
            const response: MockResponse<Response> = createResponse();
            response.cookie = jest.fn();

            mockUserService.createUser.mockResolvedValue(expectedId);

            mockTokenService.generateAccessToken.mockReturnValue(accessToken);
            mockTokenService.generateRefreshToken.mockReturnValue(refreshToken);

            mockCookieUtils.createAuthCookies.mockReturnValue(authCookies);

            await userController.createUser(request, response);

            expect(mockUserService.createUser).toHaveBeenCalledWith(user);
            expect(mockUserService.createUser).toHaveBeenCalledTimes(1);

            expect(mockTokenService.generateAccessToken).toHaveBeenCalledWith(expectedId);
            expect(mockTokenService.generateAccessToken).toHaveBeenCalledTimes(1);

            expect(mockTokenService.generateRefreshToken).toHaveBeenCalledWith(expectedId);
            expect(mockTokenService.generateRefreshToken).toHaveBeenCalledTimes(1);

            expect(mockCookieUtils.createAuthCookies).toHaveBeenCalledWith(accessToken, refreshToken);
            expect(mockCookieUtils.createAuthCookies).toHaveBeenCalledTimes(1);

            authCookies.forEach((cookie: ICookiePayload) => {
                expect(response.cookie).toHaveBeenCalledWith(cookie.name, cookie.value, cookie.options);
            });
            expect(response.cookie).toHaveBeenCalledTimes(authCookies.length);

            expect(response.statusCode).toBe(expectedStatusCode);
            expect(response._getJSONData()).toEqual({ id: expectedId });
        });
    });

    describe("loginUser", () => {
        it("logs in the user", async () => {
            const expectedStatusCode: number = 200;
            const accessToken: string = faker.internet.jwt();
            const refreshToken: string = faker.internet.jwt();
            const expectedUser: User = new User(
                1,
                faker.internet.displayName(),
                faker.internet.password(),
                faker.internet.exampleEmail(),
            );
            const accessTokenCookieOptions: CookieOptions = {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 900000
            };
            const refreshTokenCookieOptions: CookieOptions = {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 604800000
            };
            const authCookies: ICookiePayload[] = [
                { name: "access_token", value: accessToken, options: accessTokenCookieOptions },
                { name: "refresh_token", value: refreshToken, options: refreshTokenCookieOptions }
            ];
            const email: string = faker.internet.exampleEmail();
            const password: string = faker.internet.password();
            const request: MockRequest<Request> = createRequest({
                method: "GET",
                url: "/api/user/login",
                body: {
                    email: email,
                    password: password,
                }
            });
            const response: MockResponse<Response> = createResponse();
            response.cookie = jest.fn();

            mockUserService.getUserByLogin.mockResolvedValue(expectedUser);

            mockTokenService.generateAccessToken.mockReturnValue(accessToken);
            mockTokenService.generateRefreshToken.mockReturnValue(refreshToken);

            mockCookieUtils.createAuthCookies.mockReturnValue(authCookies);

            await userController.loginUser(request, response);

            expect(mockUserService.getUserByLogin).toHaveBeenCalledWith(email, password);
            expect(mockUserService.getUserByLogin).toHaveBeenCalledTimes(1);

            expect(mockTokenService.generateAccessToken).toHaveBeenCalledWith(expectedUser.getId());
            expect(mockTokenService.generateAccessToken).toHaveBeenCalledTimes(1);

            expect(mockTokenService.generateRefreshToken).toHaveBeenCalledWith(expectedUser.getId());
            expect(mockTokenService.generateRefreshToken).toHaveBeenCalledTimes(1);

            expect(mockCookieUtils.createAuthCookies).toHaveBeenCalledWith(accessToken, refreshToken);
            expect(mockCookieUtils.createAuthCookies).toHaveBeenCalledTimes(1);

            authCookies.forEach((cookie: ICookiePayload) => {
                expect(response.cookie).toHaveBeenCalledWith(cookie.name, cookie.value, cookie.options);
            });
            expect(response.cookie).toHaveBeenCalledTimes(authCookies.length);

            expect(response.statusCode).toBe(expectedStatusCode);
            expect(response._getJSONData()).toEqual({
                id: expectedUser.getId(),
                name: expectedUser.getName(),
                email: expectedUser.getEmail(),
            });
        });
    });

    describe("logoutUser", () => {
        it("logs out the user", () => {
            const options: CookieOptions = {
                maxAge: 0
            };
            const emptyAccessTokenCookie: ICookiePayload = {
                name: "access_token",
                value: "",
                options: options,
            };
            const emptyRefreshTokenCookie: ICookiePayload = {
                name: "refresh_token",
                value: "",
                options: options,
            };
            const emptyAuthCookies: ICookiePayload[] = [emptyAccessTokenCookie, emptyRefreshTokenCookie];
            const request: MockRequest<Request> = createRequest({
                method: "GET",
                url: "/api/user/logout",
            });
            const response: MockResponse<Response> = createResponse();
            response.cookie = jest.fn();

            mockCookieUtils.createEmptyAuthCookies.mockReturnValue(emptyAuthCookies);

            userController.logoutUser(request, response);

            emptyAuthCookies.forEach((cookie: ICookiePayload) => {
                expect(response.cookie).toHaveBeenCalledWith(cookie.name, cookie.value, cookie.options);
            });
            expect(response.cookie).toHaveBeenCalledTimes(emptyAuthCookies.length);
        });
    });

    describe("getCurrentUser", () => {
        it("gets the current user", async () => {
            const id = 1;
            const request: MockRequest<Request> = createRequest({
                method: "GET",
                url: "/api/user/me",
                user: {
                    id: id
                },
            });
            const response: MockResponse<Response> = createResponse();
            const expectedUser: User = new User(id,
                faker.internet.displayName(),
                faker.internet.password(),
                faker.internet.exampleEmail(),
            );
            const expectedStatusCode: number = 200;

            mockUserService.getUser.mockResolvedValue(expectedUser);

            await userController.getCurrentUser(request, response);

            expect(mockUserService.getUser).toHaveBeenCalledWith(id);
            expect(mockUserService.getUser).toHaveBeenCalledTimes(1);
            expect(response.statusCode).toBe(expectedStatusCode);
            expect(response._getJSONData()).toEqual({
                user: expectedUser
            });
        });
    });

    describe("getUserById", () => {
        it("gets user by ID", async () => {
            const id: number = 1;
            const expectedUser: User = new User(
                id,
                faker.internet.displayName(),
                faker.internet.password(),
                faker.internet.exampleEmail()
            );
            const request: MockRequest<Request<{ userId: number }>> = createRequest({
                method: "GET",
                url: `/api/user/${id}`,
                params: {
                    userId: id,
                },
            });
            const response: MockResponse<Response> = createResponse();

            mockUserService.getUser.mockResolvedValue(expectedUser);

            await userController.getUserById(request, response);

            expect(mockUserService.getUser).toHaveBeenCalledWith(id);
            expect(mockUserService.getUser).toHaveBeenCalledTimes(1);
            expect(response.statusCode).toBe(200);
            expect(response._getJSONData()).toEqual(expectedUser);
        });
    });
});