import bcrypt from "bcrypt";
import * as userRepository from "@repository/userRepository";
import User from "@model/user";

export const getAllUsers = async () => {
    return await userRepository.getAllUsers();
}

export const createUser = async (user: any) => {
    const saltRounds = 10;
    user.password = bcrypt.hashSync(user.password, saltRounds);

    return await userRepository.createUser(user);
}

export const loginUser = async (loginDetails: any) => {
    const user: User = await userRepository.getUserByEmail(loginDetails.email);

    if (bcrypt.compareSync(loginDetails.password, user.getPassword())) {
        return true;
    }
    return false;
}

export const getUser = async (userId: number) => {
    return await userRepository.getUser(userId);
}