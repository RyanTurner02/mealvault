import * as z from "zod";

export interface IUserValidationService {
    validateName(name: string): boolean;
    validateEmail(email: string): boolean;
    validatePassword(password: string): boolean;
}

export const createUserValidationService = (): IUserValidationService => {
    const validateName = (name: string): boolean => {
        const minLength: number = 1;
        const maxLength: number = 32;

        return name.length >= minLength &&
            name.length <= maxLength
    }

    const validateEmail = (email: string): boolean => {
        return z.email().safeParse(email).success;
    }

    const validatePassword = (password: string): boolean => {
        const pattern: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,71}$/;
        return pattern.test(password);
    }

    return {
        validateName,
        validateEmail,
        validatePassword
    };
}