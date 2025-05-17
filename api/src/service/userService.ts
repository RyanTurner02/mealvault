import bcrypt from "bcrypt";
import * as userRepository from "@repository/userRepository";

export const getAllUsers = async () => {
    return await userRepository.getAllUsers();
}

export const createUser = async (user: any) => {
    const saltRounds = 10;
    user.password = bcrypt.hashSync(user.password, saltRounds);

    return await userRepository.createUser(user);
}

export const loginUser = async (loginDetails: any) => {
    const saltRounds = 10;
    loginDetails.password = bcrypt.hashSync(loginDetails.password, saltRounds);

    return await userRepository.userExistsAndIsNotDeleted(loginDetails.email, loginDetails.password);
}

export const getUser = async (userId: number) => {
    return await userRepository.getUser(userId);
}