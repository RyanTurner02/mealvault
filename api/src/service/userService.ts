const userRepository = require("../repository/userRepository");

const getAllUsers = async () => {
    return await userRepository.getAllUsers();
}

const createUser = async (user: any) => {
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