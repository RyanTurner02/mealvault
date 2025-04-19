const userRepository = require("../repository/userRepository");

const getAllUsers = async () => {
    return await userRepository.getAllUsers();
}

const getUser = async (userId: number) => {
    return await userRepository.getUser(userId);
}

module.exports = {
    getAllUsers,
    getUser,
}