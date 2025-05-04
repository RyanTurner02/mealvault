import * as userRepository from "@repository/userRepository";

test('it will retrieve users', async () => {
    const data = await userRepository.getAllUsers();
    expect(data).toBeTruthy();
});