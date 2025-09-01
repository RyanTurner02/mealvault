import bcrypt from "bcrypt";
import { IUserRepository } from "@repository/user-repository";
import User from "@model/user";
import { UserDto } from "@dtos/user-dto";

interface UserServiceDependencies {
    userRepository: IUserRepository;
};

export interface IUserService {
    createUser(user: UserDto): Promise<number | null>;
    getUserByLogin(email: string, password: string): Promise<User | null>;
    getUser(userId: number): Promise<User | null>;
};

export const createUserService = ({ userRepository }: UserServiceDependencies): IUserService => {
    const createUser = async (user: UserDto) => {
        const saltRounds = 10;
        user.password = await bcrypt.hash(user.password, saltRounds);

        return await userRepository.createUser(user);
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

    return {
        createUser,
        getUserByLogin,
        getUser
    };
}