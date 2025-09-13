import { IUserRepository } from "@repository/user-repository";
import { createUserService, IUserService } from "@service/user-service";
import { faker } from "@faker-js/faker";
import User from "@model/user";
import * as bcrypt from "bcrypt";
import { UserDto } from "@dtos/user-dto";
import { IUserValidationService } from "@service/user-validation-service";

const mockUserValidationService: jest.Mocked<IUserValidationService> = {
    validateName: jest.fn(),
    validateEmail: jest.fn(),
    validatePassword: jest.fn(),
};

const mockUserRepository: jest.Mocked<IUserRepository> = {
    getUserByEmail: jest.fn(),
    createUser: jest.fn(),
    getUser: jest.fn(),
    editName: jest.fn(),
    editEmail: jest.fn(),
    editPassword: jest.fn(),
};

const hashedPassword = faker.internet.password();

jest.mock("bcrypt", () => ({
    hash: jest.fn((password: string, salt: number) => Promise.resolve(hashedPassword)),
    compareSync: jest.fn((password: string, hashedPassword: string) => password === hashedPassword),
}));

describe("UserService", () => {
    let userService: IUserService;

    beforeAll(async () => {
        userService = createUserService({
            userValidationService: mockUserValidationService,
            userRepository: mockUserRepository
        });
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("createUser", () => {
        it("creates user with name, email, and password", async () => {
            const rawPassword = faker.internet.password();
            const userDto: UserDto = {
                name: faker.internet.displayName(),
                email: faker.internet.exampleEmail(),
                password: rawPassword,
            };

            mockUserRepository.createUser.mockResolvedValue(1);

            const expected: number = 1;
            const actual: number | null = await userService.createUser(userDto);

            expect(bcrypt.hash).toHaveBeenCalledWith(rawPassword, 10);
            expect(bcrypt.hash).toHaveBeenCalledTimes(1);

            expect(mockUserRepository.createUser).toHaveBeenCalledTimes(1);
            expect(mockUserRepository.createUser).toHaveBeenCalledWith(
                expect.objectContaining({
                    name: userDto.name,
                    email: userDto.email,
                    password: hashedPassword,
                })
            );

            expect(actual).toBe(expected);
        });
    });

    describe("getUserByLogin", () => {
        it("gets user by email and password", async () => {
            const rawPassword = faker.internet.password();
            const expected: User = new User(
                1,
                faker.internet.displayName(),
                rawPassword,
                faker.internet.exampleEmail(),
            );

            mockUserRepository.getUserByEmail.mockResolvedValue(expected);

            const actual: User | null = await userService.getUserByLogin(expected.getEmail(), rawPassword);

            expect(mockUserRepository.getUserByEmail).toHaveBeenCalledTimes(1);
            expect(mockUserRepository.getUserByEmail).toHaveBeenCalledWith(expected.getEmail());

            expect(bcrypt.compareSync).toHaveBeenCalledTimes(1);
            expect(bcrypt.compareSync).toHaveBeenCalledWith(rawPassword, expected.getPassword());

            expect(actual).not.toBeNull();
            expect(actual).toEqual(expected);
        });

        it("does not get user with email and invalid password", async () => {
            const email: string = faker.internet.exampleEmail();
            const user: User = new User(
                1,
                faker.internet.displayName(),
                faker.internet.password(),
                email,
            );
            const invalidPassword: string = faker.internet.password();

            mockUserRepository.getUserByEmail.mockResolvedValue(user);

            const actual: User | null = await userService.getUserByLogin(email, invalidPassword);

            expect(mockUserRepository.getUserByEmail).toHaveBeenCalledWith(email);
            expect(mockUserRepository.getUserByEmail).toHaveBeenCalledTimes(1);

            expect(bcrypt.compareSync).toHaveBeenCalledWith(invalidPassword, user.getPassword());
            expect(bcrypt.compareSync).toHaveBeenCalledTimes(1);

            expect(actual).toBeNull();
        });

        it("does not get user with invalid email", async () => {
            const email: string = faker.internet.exampleEmail();

            mockUserRepository.getUserByEmail.mockResolvedValue(null);

            const actual: User | null = await userService.getUserByLogin(email, faker.internet.password());

            expect(mockUserRepository.getUserByEmail).toHaveBeenCalledWith(email);
            expect(mockUserRepository.getUserByEmail).toHaveBeenCalledTimes(1);

            expect(actual).toBeNull();
        });
    });

    describe("getUser", () => {
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

    describe("editName", () => {
        it("updates the user's name", async () => {
            const userId: number = 1;
            const name: string = faker.internet.displayName();

            mockUserValidationService.validateName.mockReturnValue(true);
            mockUserRepository.editName.mockResolvedValue(true);

            const actual: boolean = await userService.editName(userId, name);

            expect(actual).toBe(true);

            expect(mockUserValidationService.validateName).toHaveBeenCalledTimes(1);
            expect(mockUserValidationService.validateName).toHaveBeenCalledWith(name);

            expect(mockUserRepository.editName).toHaveBeenCalledTimes(1);
            expect(mockUserRepository.editName).toHaveBeenCalledWith(userId, name);
        });
    });

    describe("editEmail", () => {
        it("updates the user's email", async () => {
            const userId: number = 1;
            const email: string = faker.internet.exampleEmail();

            mockUserValidationService.validateEmail.mockReturnValue(true);
            mockUserRepository.editEmail.mockResolvedValue(true);

            const actual: boolean = await userService.editEmail(userId, email);

            expect(actual).toBe(true);

            expect(mockUserValidationService.validateEmail).toHaveBeenCalledTimes(1);
            expect(mockUserValidationService.validateEmail).toHaveBeenCalledWith(email);

            expect(mockUserRepository.editEmail).toHaveBeenCalledTimes(1);
            expect(mockUserRepository.editEmail).toHaveBeenCalledWith(userId, email);
        });
    });

    describe("editPassword", () => {
        it("updates the user's password", async () => {
            const userId: number = 1;
            const oldPassword: string = faker.internet.password();
            const newPassword: string = faker.internet.password();
            const user: User = new User(
                userId,
                faker.internet.displayName(),
                oldPassword,
                faker.internet.exampleEmail());

            mockUserRepository.getUser.mockResolvedValue(user);
            mockUserValidationService.validatePassword.mockReturnValue(true);
            mockUserRepository.editPassword.mockResolvedValue(true);

            const actual: boolean = await userService.editPassword(userId, oldPassword, newPassword);

            expect(actual).toBe(true);

            expect(mockUserRepository.getUser).toHaveBeenCalledTimes(1);
            expect(mockUserRepository.getUser).toHaveBeenCalledWith(userId);

            expect(mockUserValidationService.validatePassword).toHaveBeenCalledTimes(1);
            expect(mockUserValidationService.validatePassword).toHaveBeenCalledWith(newPassword);

            expect(mockUserRepository.editPassword).toHaveBeenCalledTimes(1);
            expect(mockUserRepository.editPassword).toHaveBeenCalledWith(userId, hashedPassword);
        });
    });
});