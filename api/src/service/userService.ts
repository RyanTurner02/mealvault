import bcrypt from "bcrypt";
import * as userRepository from "@repository/userRepository";
import User from "@model/user";
import { UserDto } from "@dtos/users/user.dto";

export const getAllUsers = async () => {
    return await userRepository.getAllUsers();
}

export const createUser = async (user: UserDto) => {
    const saltRounds = 10;
    user.password = bcrypt.hashSync(user.password, saltRounds);

    return await userRepository.createUser(user);
}

export const getUserByLogin = async (email: string, password: string) => {
    const user: User = await userRepository.getUserByEmail(email);

    if (!user) {
        return null;
    }

    if (bcrypt.compareSync(password, user.getPassword())) {
        return user;
    }
    return null;
}

export const getUser = async (userId: number) => {
    return await userRepository.getUser(userId);
}