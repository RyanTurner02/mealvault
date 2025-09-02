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

    describe("validateEmail", () => {
        test.each([
            "test@example.com"
        ])("is a valid email", (email: string) => {
            expect(userValidationService.validateEmail(email)).toBe(true);
        })

        test.each([
            "",
        ])("is an invalid email", (email: string) => {
            expect(userValidationService.validateEmail(email)).toBe(false);
        })
    })

    describe("validatePassword", () => {
        test.each([
            "X@p3^VGq",
            "Y&tHrt$DYo695K#Ekww3Vxs@2fe5zs!Gf^gH9^GP72Gid4eiQ^uBupRTyjocM83%2%iJB^R"
        ])("is a valid password", (password: string) => {
            expect(userValidationService.validatePassword(password)).toBe(true);
        });

        test.each([
            "",
            "password",
            "PASSWORD",
            "Password",
            "Password1",
            "Password!",
        ])("is an invalid password", (password: string) => {
            expect(userValidationService.validatePassword(password)).toBe(false);
        });
    });
});