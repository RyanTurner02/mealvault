import { createUserController, IUserController } from "@controller/userController";
import { IUserAuthService } from "@service/userAuthService";
import { IUserService } from "@service/userService";
import { Request, Response } from "express";
import { createRequest, createResponse, MockRequest, MockResponse } from "node-mocks-http";
import { faker } from "@faker-js/faker";
import User from "@model/user";

describe("UserController", () => {
    let userController: IUserController;
    let request: MockRequest<Request>;
    let response: MockResponse<Response>;

    const mockUserService: jest.Mocked<IUserService> = {
        createUser: jest.fn(),
        getUserByLogin: jest.fn(),
        getUser: jest.fn(),
    };

    const mockUserAuthService: jest.Mocked<IUserAuthService> = {
        generateAccessToken: jest.fn(),
        generateRefreshToken: jest.fn(),
    };

    beforeAll(async () => {
        userController = createUserController({
            userService: mockUserService,
            userAuthService: mockUserAuthService
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
});