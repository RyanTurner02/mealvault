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
            "test@example.com",
            "simple@example.com",
            "very.common@example.com",
            "disposable.style.email.with+symbol@example.com",
            "other.email-with-dash@example.com",
            "user.name+tag+sorting@example.com",
            "x@example.com",
            "example-indeed@strange-example.com",
            "admin@mailserver1.com",
            "example@s.example",
            "firstname.lastname@example.com"
        ])("is a valid email", (email: string) => {
            expect(userValidationService.validateEmail(email)).toBe(true);
        })

        test.each([
            "",
            "plainaddress",
            "missingatsign.com",
            "user@.com",
            "user@domain",
            "user@domain..com",
            "user@-domain.com",
            "us er@example.com",
            "user@exa mple.com",
            "user@domain,com",
            "user@domain@domain.com",
            ".user@example.com",
            "user.@example.com",
            "user..name@example.com",
            "@example.com",
            "user@",
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