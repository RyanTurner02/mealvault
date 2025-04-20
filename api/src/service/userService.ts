import bcrypt from "bcrypt";
const userRepository = require("../repository/userRepository");

const getAllUsers = async () => {
    return await userRepository.getAllUsers();
}

const createUser = async (user: any) => {
    const saltRounds = 10;
    user.password = bcrypt.hashSync(user.password, saltRounds);

    return await userRepository.createUser(user);
}

const getUser = async (userId: number) => {
    return await userRepository.getUser(userId);
}

module.exports = {
    getAllUsers,
    createUser,
    getUser,
}