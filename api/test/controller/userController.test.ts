import { createUserController, IUserController } from "@controller/userController";
import { IAuthService } from "@service/authService";
import { IUserService } from "@service/userService";
import { Request, Response } from "express";
import { createRequest, createResponse, MockRequest, MockResponse } from "node-mocks-http";
import { faker } from "@faker-js/faker";
import User from "@model/user";
import { ITokenService } from "@service/tokenService";

describe("UserController", () => {
    let userController: IUserController;
    let request: MockRequest<Request>;
    let response: MockResponse<Response>;

    const mockUserService: jest.Mocked<IUserService> = {
        createUser: jest.fn(),
        getUserByLogin: jest.fn(),
        getUser: jest.fn(),
    };

    const mockAuthService: jest.Mocked<IAuthService> = {
        logout: jest.fn(),
    };

    const mockTokenService: jest.Mocked<ITokenService> = {
        generateAccessToken: jest.fn(),
        generateRefreshToken: jest.fn(),
    }

    beforeAll(async () => {
        userController = createUserController({
            userService: mockUserService,
            authService: mockAuthService,
            tokenService: mockTokenService,
        });
    });

    beforeEach(() => {
        request = createRequest();
        response = createResponse();
        jest.clearAllMocks();
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