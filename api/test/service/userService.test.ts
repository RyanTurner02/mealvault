import { IUserRepository } from "@repository/userRepository";
import { createUserService, IUserService } from "@service/userService";
import { faker } from "@faker-js/faker";
import User from "@model/user";
import * as bcrypt from "bcrypt";

const mockUserRepository: jest.Mocked<IUserRepository> = {
    getUserByEmail: jest.fn(),
    createUser: jest.fn(),
    getUser: jest.fn(),
};

jest.mock("bcrypt", () => ({
    hash: jest.fn((password: string, salt: number) => Promise.resolve("hashedPassword")),
    compareSync: jest.fn((password: string, hashedPassword: string) => password === hashedPassword),
}));

describe("UserService", () => {
    let userService: IUserService;

    beforeAll(async () => {
        userService = createUserService({
            userRepository: mockUserRepository
        });
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("creates user with name, email, and password", async () => {

    });

    it("gets user by email and password", async () => {
        const password = faker.internet.password();
        const expected: User = new User(
            1,
            faker.internet.displayName(),
            password,
            faker.internet.exampleEmail(),
        );

        mockUserRepository.getUserByEmail.mockResolvedValue(expected);

        const actual: User | null = await userService.getUserByLogin(expected.getEmail(), password);

        expect(mockUserRepository.getUserByEmail).toHaveBeenCalledTimes(1);
        expect(mockUserRepository.getUserByEmail).toHaveBeenCalledWith(expected.getEmail());

        expect(bcrypt.compareSync).toHaveBeenCalledTimes(1);
        expect(bcrypt.compareSync).toHaveBeenCalledWith(password, expected.getPassword());

        expect(actual).not.toBeNull();
        expect(actual).toEqual(expected);
    });

    it("gets user by id", async () => {
        const expected: User = new User(
            1,
            faker.internet.displayName(),
            faker.internet.password(),
            faker.internet.exampleEmail(),
        );

        mockUserRepository.getUser.mockResolvedValue(expected);

        const actual: User | null = await userService.getUser(expected.getId());

        expect(actual).not.toBeNull();
        expect(mockUserRepository.getUser).toHaveBeenCalledWith(expected.getId());
        expect(actual).toEqual(expected);
    });
});