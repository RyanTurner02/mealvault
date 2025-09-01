import { createUserValidationService, IUserValidationService } from "@service/user-validation-service";

describe("UserValidationService", () => {
    let userValidationService: IUserValidationService;

    beforeAll(async () => {
        userValidationService = createUserValidationService();
    });

    describe("validateName", () => {
        test.each([
            "A",
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456"
        ])("has a valid length", (name: string) => {
            expect(userValidationService.validateName(name)).toBe(true);
        })

        test.each([
            "",
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567"
        ])("has an invalid length", (name: string) => {
            expect(userValidationService.validateName(name)).toBe(false);
        })
    });
});