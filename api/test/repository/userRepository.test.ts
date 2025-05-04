const userRepository = require("../../src/repository/userRepository");

test('it will retrieve users', async () => {
    const data = await userRepository.getAllUsers();
    expect(data).toBeTruthy();
});