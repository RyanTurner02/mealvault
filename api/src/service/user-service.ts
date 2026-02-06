import bcrypt from "bcrypt";
import { IUserRepository } from "@repository/user-repository";
import User from "@model/user";
import { UserDto } from "@dtos/user-dto";
import { IUserValidationService } from "@service/user-validation-service";

interface UserServiceDependencies {
    userValidationService: IUserValidationService;
    userRepository: IUserRepository;
};

export interface IUserService {
    createUser(user: UserDto): Promise<number | null>;
    getUserByLogin(email: string, password: string): Promise<User | null>;
    getUser(userId: number): Promise<User | null>;
    editName(userId: number, name: string): Promise<boolean>;
    editEmail(userId: number, email: string): Promise<boolean>;
    editPassword(userId: number, oldPassword: string, newPassword: string): Promise<boolean>;
    deleteUser(userId: number): Promise<boolean>;
};

export const createUserService = ({
    userValidationService,
    userRepository
}: UserServiceDependencies): IUserService => {
    const createUser = async (user: UserDto) => {
        user.password = await hashPassword(user.password);
        return await userRepository.createUser(user);
    }

    const hashPassword = async (password: string): Promise<string> => {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    }

    const getUserByLogin = async (email: string, password: string) => {
        const user: User | null = await userRepository.getUserByEmail(email);

        if (!user) {
            return null;
        }

        if (bcrypt.compareSync(password, user.getPassword())) {
            return user;
        }
        return null;
    }

    const getUser = async (userId: number) => {
        return await userRepository.getUser(userId);
    }

    const editName = async (userId: number, name: string): Promise<boolean> => {
        if (!userId || !name) {
            return false;
        }

        if (!userValidationService.validateName(name)) {
            return false;
        }

        return await userRepository.editName(userId, name);
    }

    const editEmail = async (userId: number, email: string): Promise<boolean> => {
        if (!email) {
            return false;
        }

        const user: User | null = await userRepository.getUserByEmail(email);

        if (user) {
            return false;
        }

        if (!userValidationService.validateEmail(email)) {
            return false;
        }

        return await userRepository.editEmail(userId, email);
    }

    const editPassword = async (userId: number, oldPassword: string, newPassword: string): Promise<boolean> => {
        if (!oldPassword || !newPassword) {
            return false;
        }

        const user: User | null = await userRepository.getUser(userId);

        if (!user) {
            return false;
        }

        if (!bcrypt.compareSync(oldPassword, user.getPassword())) {
            return false;
        }

        if (oldPassword === newPassword) {
            return false;
        }

        if (!userValidationService.validatePassword(newPassword)) {
            return false;
        }

        newPassword = await hashPassword(newPassword);
        return await userRepository.editPassword(userId, newPassword);
    }

    const deleteUser = async (userId: number): Promise<boolean> => {
        return await userRepository.deleteUser(userId);
    }

    return {
        createUser,
        getUserByLogin,
        getUser,
        editName,
        editEmail,
        editPassword,
        deleteUser
    };
}