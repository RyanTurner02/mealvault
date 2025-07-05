import { IUserRepository } from "@repository/userRepository";
import { createUserService, IUserService } from "@service/userService";
import { faker } from "@faker-js/faker/.";
import User from "@model/user";

const mockUserRepository: jest.Mocked<IUserRepository> = {
    getUserByEmail: jest.fn(),
    createUser: jest.fn(),
    getUser: jest.fn(),
};

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