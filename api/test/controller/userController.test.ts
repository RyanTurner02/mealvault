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
    let request: MockRequest<Request>;
    let response: MockResponse<Response>;

    const mockUserService: jest.Mocked<IUserService> = {
        createUser: jest.fn(),
        getUserByLogin: jest.fn(),
        getUser: jest.fn(),
    };

    const mockCookieUtils: jest.Mocked<ICookieUtils> = {
        createAuthCookies: jest.fn(),
        clearAuthCookies: jest.fn(),
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
        request = createRequest();
        response = createResponse();
        response.cookie = jest.fn();
        jest.clearAllMocks();
    });

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
            maxAge: 900000
        };
        const authCookies: ICookiePayload[] = [
            { name: "access_token", value: accessToken, options: accessTokenCookieOptions },
            { name: "refresh_token", value: refreshToken, options: refreshTokenCookieOptions }
        ];
        request = createRequest({
            method: "POST",
            url: "/api/user/create",
            body: {
                name: user.name,
                email: user.email,
                password: user.password,
            }
        });

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

    it("gets the current user", async () => {
        const id = 1;
        request = createRequest({
            method: "GET",
            url: "/api/user/me",
            user: {
                id: id
            },
        });

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

        mockUserService.getUser.mockResolvedValue(expectedUser);
        await userController.getUserById(request, response);

        expect(mockUserService.getUser).toHaveBeenCalledWith(id);
        expect(mockUserService.getUser).toHaveBeenCalledTimes(1);
        expect(response.statusCode).toBe(200);
        expect(response._getJSONData()).toEqual(expectedUser);
    });
});